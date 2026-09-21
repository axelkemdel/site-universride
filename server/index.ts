import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { desc, eq, gte, sql } from "drizzle-orm";
import { db } from "./db/index";
import { adminLogs, adminUsers, analyticsEvents, contactSubmissions, mediaLibrary, pageViews, siteSections, siteSettings, type AdminUser } from "./db/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Hostinger place l'app derrière un reverse proxy (SSL terminé en amont) :
// nécessaire pour que les cookies "secure" et req.protocol/req.ip soient corrects en HTTPS.
app.set("trust proxy", 1);
const server = createServer(app);
// UPLOADS_DIR : chemin absolu recommandé en production (ex: /home/USER/uploads) pour que
// les fichiers survivent aux redéploiements. Par défaut : ./uploads (dev local uniquement).
const uploadsDir = process.env.UPLOADS_DIR ? path.resolve(process.env.UPLOADS_DIR) : path.resolve(process.cwd(), "uploads");
const upload = multer({ dest: uploadsDir, limits: { fileSize: 8 * 1024 * 1024 } });
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";
const cookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60 * 1000 };

type AuthedRequest = Request & { admin?: AdminUser };
const fallbackSections = [{ id: 0, sectionKey: "hero", titleFr: "Votre trajet, notre univers.", titleEn: "The city moves. You do too.", titleSg: "gbata ayeke gue na li ko.", contentFr: "Univers Ride rassemble les trajets, les livraisons et les réservations du quotidien.", contentEn: "Univers Ride brings together daily trips, deliveries, and bookings.", contentSg: "Univers Ride agba abango lege na yâ gbata ti Bangui.", imageId: null, updatedBy: null, updatedAt: new Date() }];
const fallbackSettings = [{ settingKey: "support_email", settingValue: "universride.rca@univers-ride.org" }, { settingKey: "call_center_phone", settingValue: "+236 72 63 63 63" }];

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

function sign(admin: AdminUser) { return jwt.sign({ id: admin.id, role: admin.role, email: admin.email }, JWT_SECRET, { expiresIn: "8h" }); }
function publicAdmin(admin: AdminUser) { const { passwordHash: _, ...safe } = admin; return safe; }
async function getAdmin(req: Request) {
  const token = req.cookies?.univers_ride_admin;
  if (!token || !db) return null;
  try { const payload = jwt.verify(token, JWT_SECRET) as { id: number }; const rows = await db.select().from(adminUsers).where(eq(adminUsers.id, payload.id)).limit(1); return rows[0]?.isActive ? rows[0] : null; } catch { return null; }
}
async function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) { const admin = await getAdmin(req); if (!admin) return res.status(401).json({ error: "Authentification requise" }); req.admin = admin; next(); }
async function audit(adminId: number, action: string, req: Request, targetEntity?: string, targetId?: number) { if (db) await db.insert(adminLogs).values({ adminId, action, targetEntity, targetId, ipAddress: req.ip }); }
function hashIp(ip = "") { return crypto.createHash("sha256").update(ip).digest("hex"); }
function daysAgo(days: number) { const date = new Date(); date.setDate(date.getDate() - days); return date; }

app.get("/api/health", (_req, res) => res.json({ ok: true, database: Boolean(db) }));
app.post("/api/auth/login", async (req, res) => { const { email, password } = req.body || {}; if (!email || !password || !db) return res.status(!db ? 503 : 400).json({ error: !db ? "Base de données indisponible" : "Email et mot de passe requis" }); const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, String(email).toLowerCase())).limit(1); const admin = rows[0]; if (!admin || !admin.isActive || !(await bcrypt.compare(password, admin.passwordHash))) return res.status(401).json({ error: "Identifiants invalides" }); await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, admin.id)); await audit(admin.id, "LOGIN", req); res.cookie("univers_ride_admin", sign(admin), cookieOptions).json({ admin: publicAdmin(admin) }); });
app.post("/api/auth/logout", async (req: AuthedRequest, res) => { if (req.cookies?.univers_ride_admin) { const admin = await getAdmin(req); if (admin) await audit(admin.id, "LOGOUT", req); } res.clearCookie("univers_ride_admin").json({ ok: true }); });
app.get("/api/auth/me", requireAdmin, (req: AuthedRequest, res) => res.json({ admin: publicAdmin(req.admin!) }));

app.get("/api/public/content", async (_req, res) => { if (!db) return res.json({ sections: fallbackSections }); try { res.json({ sections: await db.select().from(siteSections) }); } catch { res.json({ sections: fallbackSections }); } });
app.get("/api/public/settings", async (_req, res) => { if (!db) return res.json({ settings: fallbackSettings }); try { res.json({ settings: await db.select({ settingKey: siteSettings.settingKey, settingValue: siteSettings.settingValue }).from(siteSettings) }); } catch { res.json({ settings: fallbackSettings }); } });
app.post("/api/public/page-view", async (req, res) => { if (db) { const language = ["fr", "en", "sg"].includes(req.body?.language) ? req.body.language : "fr"; const deviceType = /mobile/i.test(req.headers["user-agent"] || "") ? "MOBILE" : "DESKTOP"; await db.insert(pageViews).values({ pageUrl: String(req.body?.pageUrl || "/").slice(0, 255), language, deviceType, userAgent: req.headers["user-agent"], ipHash: hashIp(req.ip) }); } res.status(202).json({ ok: true }); });
app.post("/api/public/event", async (req, res) => { if (db && req.body?.eventName) await db.insert(analyticsEvents).values({ eventName: String(req.body.eventName).slice(0, 100), metadata: req.body.metadata || {}, language: req.body.language }); res.status(202).json({ ok: true }); });
app.post("/api/public/contact", async (req, res) => { const { fullName, email, phone, subject, message } = req.body || {}; if (!fullName || !email || !message) return res.status(400).json({ error: "Nom, email et message sont requis" }); if (db) await db.insert(contactSubmissions).values({ fullName, email, phone, subject, message }); res.status(201).json({ ok: true }); });

app.get("/api/admin/analytics", requireAdmin, async (_req: AuthedRequest, res) => { if (!db) return res.json({ totals: { visits: 0, contacts: 0 }, languages: [], devices: [], timeline: [] }); const since = daysAgo(30); const [visits, contacts, languages, devices, timeline] = await Promise.all([db.select({ count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.visitedAt, since)), db.select({ count: sql<number>`count(*)` }).from(contactSubmissions).where(gte(contactSubmissions.createdAt, since)), db.select({ language: pageViews.language, count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.visitedAt, since)).groupBy(pageViews.language), db.select({ device: pageViews.deviceType, count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.visitedAt, since)).groupBy(pageViews.deviceType), db.select({ date: sql<string>`date(${pageViews.visitedAt})`, count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.visitedAt, since)).groupBy(sql`date(${pageViews.visitedAt})`).orderBy(sql`date(${pageViews.visitedAt})`) ]); res.json({ totals: { visits: Number(visits[0]?.count || 0), contacts: Number(contacts[0]?.count || 0) }, languages, devices, timeline }); });
app.get("/api/admin/contacts", requireAdmin, async (req, res) => { if (!db) return res.json({ contacts: [] }); const status = req.query.status as "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED" | undefined; const query = status ? db.select().from(contactSubmissions).where(eq(contactSubmissions.status, status)) : db.select().from(contactSubmissions); res.json({ contacts: await query.orderBy(desc(contactSubmissions.createdAt)) }); });
app.patch("/api/admin/contacts/:id", requireAdmin, async (req: AuthedRequest, res) => { if (!db) return res.status(503).json({ error: "Base de données indisponible" }); await db.update(contactSubmissions).set({ status: req.body.status }).where(eq(contactSubmissions.id, Number(req.params.id))); await audit(req.admin!.id, "UPDATE_CONTACT", req, "contact_submissions", Number(req.params.id)); res.json({ ok: true }); });
app.get("/api/admin/content", requireAdmin, async (_req, res) => { res.json({ sections: db ? await db.select().from(siteSections) : fallbackSections, settings: db ? await db.select().from(siteSettings) : fallbackSettings }); });
app.put("/api/admin/content/sections/:key", requireAdmin, async (req: AuthedRequest, res) => { if (!db) return res.status(503).json({ error: "Base de données indisponible" }); const values = { sectionKey: req.params.key, titleFr: req.body.titleFr, titleEn: req.body.titleEn, titleSg: req.body.titleSg, contentFr: req.body.contentFr, contentEn: req.body.contentEn, contentSg: req.body.contentSg, updatedBy: req.admin!.id }; await db.insert(siteSections).values(values).onDuplicateKeyUpdate({ set: values }); await audit(req.admin!.id, "UPSERT_SECTION", req, "site_sections"); res.json({ ok: true }); });
app.put("/api/admin/content/settings/:key", requireAdmin, async (req: AuthedRequest, res) => { if (!db) return res.status(503).json({ error: "Base de données indisponible" }); const value = String(req.body.value || ""); await db.insert(siteSettings).values({ settingKey: req.params.key, settingValue: value }).onDuplicateKeyUpdate({ set: { settingValue: value, updatedAt: new Date() } }); await audit(req.admin!.id, "UPDATE_SETTING", req, "site_settings"); res.json({ ok: true }); });
app.get("/api/admin/media", requireAdmin, async (_req, res) => res.json({ media: db ? await db.select().from(mediaLibrary).orderBy(desc(mediaLibrary.createdAt)) : [] }));
app.post("/api/admin/media", requireAdmin, upload.single("file"), async (req: AuthedRequest, res) => { if (!db || !req.file) return res.status(400).json({ error: "Fichier manquant ou base indisponible" }); const url = `/uploads/${req.file.filename}`; const rows = await db.insert(mediaLibrary).values({ filename: req.file.originalname, url, mimeType: req.file.mimetype, sizeInBytes: req.file.size, uploadedBy: req.admin!.id }); await audit(req.admin!.id, "UPLOAD_MEDIA", req, "media_library"); res.status(201).json({ id: rows[0].insertId, url }); });
app.delete("/api/admin/media/:id", requireAdmin, async (req: AuthedRequest, res) => { if (!db) return res.status(503).json({ error: "Base de données indisponible" }); await db.delete(mediaLibrary).where(eq(mediaLibrary.id, Number(req.params.id))); await audit(req.admin!.id, "DELETE_MEDIA", req, "media_library", Number(req.params.id)); res.json({ ok: true }); });

const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
app.use(express.static(staticPath));
app.get("*", (_req, res) => res.sendFile(path.join(staticPath, "index.html")));
const port = Number(process.env.PORT || 8080);
server.listen(port, "0.0.0.0", () => console.log(`Univers Ride server running on http://localhost:${port} (database: ${Boolean(db) ? "connected" : "fallback"})`));
