import "dotenv/config";
import bcrypt from "bcryptjs";
import { db, closeDatabase } from "./index";
import { adminUsers, siteSettings } from "./schema";

async function seed() {
  if (!db) throw new Error("DATABASE_URL est requis pour exécuter le seeder.");
  const email = process.env.ADMIN_EMAIL || "admin@universride.net";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe-UniversRide-2026!";
  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(adminUsers).values({ name: "Administrateur Univers Ride", email, passwordHash, role: "SUPER_ADMIN" }).onDuplicateKeyUpdate({ set: { passwordHash, updatedAt: new Date() } });
  await db.insert(siteSettings).values([
    { settingKey: "support_email", settingValue: "universride.rca@univers-ride.org", description: "Adresse de contact publique" },
    { settingKey: "call_center_phone", settingValue: "+236 72 63 63 63", description: "Numéro du Call Center" },
  ]).onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
  console.log(`Administrateur initial créé/mis à jour : ${email}`);
}

seed().finally(() => closeDatabase().catch(console.error));
