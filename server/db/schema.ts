import { relations } from "drizzle-orm";
import { bigint, index, int, json, mysqlEnum, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const adminUsers = mysqlTable("admin_users", {
  id: serial("id").primaryKey(), name: varchar("name", { length: 255 }).notNull(), email: varchar("email", { length: 255 }).notNull().unique(), passwordHash: text("password_hash").notNull(), role: mysqlEnum("role", ["SUPER_ADMIN", "ADMIN", "EDITOR"]).default("EDITOR").notNull(), isActive: int("is_active").default(1).notNull(), lastLoginAt: timestamp("last_login_at"), createdAt: timestamp("created_at").defaultNow().notNull(), updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export const mediaLibrary = mysqlTable("media_library", {
  id: serial("id").primaryKey(), filename: varchar("filename", { length: 255 }).notNull(), url: text("url").notNull(), mimeType: varchar("mime_type", { length: 100 }).notNull(), sizeInBytes: int("size_in_bytes").notNull(), altTextFr: varchar("alt_text_fr", { length: 255 }), altTextEn: varchar("alt_text_en", { length: 255 }), altTextSg: varchar("alt_text_sg", { length: 255 }), uploadedBy: bigint("uploaded_by", { mode: "number", unsigned: true }).references(() => adminUsers.id, { onDelete: "set null" }), createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const siteSections = mysqlTable("site_sections", {
  id: serial("id").primaryKey(), sectionKey: varchar("section_key", { length: 100 }).notNull().unique(), titleFr: varchar("title_fr", { length: 255 }), titleEn: varchar("title_en", { length: 255 }), titleSg: varchar("title_sg", { length: 255 }), contentFr: text("content_fr"), contentEn: text("content_en"), contentSg: text("content_sg"), imageId: bigint("image_id", { mode: "number", unsigned: true }).references(() => mediaLibrary.id, { onDelete: "set null" }), updatedBy: bigint("updated_by", { mode: "number", unsigned: true }).references(() => adminUsers.id, { onDelete: "set null" }), updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export const siteSettings = mysqlTable("site_settings", {
  id: serial("id").primaryKey(), settingKey: varchar("setting_key", { length: 100 }).notNull().unique(), settingValue: text("setting_value").notNull(), description: varchar("description", { length: 255 }), updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: serial("id").primaryKey(), fullName: varchar("full_name", { length: 255 }).notNull(), email: varchar("email", { length: 255 }).notNull(), phone: varchar("phone", { length: 50 }), subject: varchar("subject", { length: 255 }), message: text("message").notNull(), status: mysqlEnum("status", ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"]).default("NEW").notNull(), createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const pageViews = mysqlTable("page_views", {
  id: serial("id").primaryKey(), pageUrl: varchar("page_url", { length: 255 }).notNull(), language: varchar("language", { length: 10 }).notNull(), deviceType: mysqlEnum("device_type", ["DESKTOP", "MOBILE", "TABLET"]).default("DESKTOP").notNull(), userAgent: text("user_agent"), ipHash: varchar("ip_hash", { length: 64 }), country: varchar("country", { length: 100 }), visitedAt: timestamp("visited_at").defaultNow().notNull(),
}, (table) => ({ visitedAtIndex: index("visited_at_idx").on(table.visitedAt), pageUrlIndex: index("page_url_idx").on(table.pageUrl) }));
export const analyticsEvents = mysqlTable("analytics_events", { id: serial("id").primaryKey(), eventName: varchar("event_name", { length: 100 }).notNull(), metadata: json("metadata"), language: varchar("language", { length: 10 }), createdAt: timestamp("created_at").defaultNow().notNull() }, (table) => ({ eventNameIndex: index("event_name_idx").on(table.eventName) }));
export const adminLogs = mysqlTable("admin_logs", { id: serial("id").primaryKey(), adminId: bigint("admin_id", { mode: "number", unsigned: true }).references(() => adminUsers.id, { onDelete: "set null" }), action: varchar("action", { length: 100 }).notNull(), targetEntity: varchar("target_entity", { length: 100 }), targetId: int("target_id"), details: text("details"), ipAddress: varchar("ip_address", { length: 45 }), createdAt: timestamp("created_at").defaultNow().notNull() });

export const adminRelations = relations(adminUsers, ({ many }) => ({ logs: many(adminLogs), media: many(mediaLibrary) }));
export const mediaRelations = relations(mediaLibrary, ({ one }) => ({ uploader: one(adminUsers, { fields: [mediaLibrary.uploadedBy], references: [adminUsers.id] }) }));
export const logRelations = relations(adminLogs, ({ one }) => ({ admin: one(adminUsers, { fields: [adminLogs.adminId], references: [adminUsers.id] }) }));

export type AdminUser = typeof adminUsers.$inferSelect;
export type SiteSection = typeof siteSections.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
