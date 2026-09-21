import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

/**
 * Deux façons de configurer la connexion (Hostinger hPanel fournit les deux) :
 *  1) DATABASE_URL="mysql://user:pass@host:3306/dbname" (une seule variable)
 *  2) DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME (variables séparées,
 *     pratique quand hPanel les affiche individuellement dans hPanel > Bases de données)
 * Si DATABASE_URL est présent, il est prioritaire.
 */
function resolveConnectionUrl(): string | null {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (DB_HOST && DB_USER && DB_NAME) {
    const port = DB_PORT || "3306";
    const password = encodeURIComponent(DB_PASSWORD || "");
    const user = encodeURIComponent(DB_USER);
    return `mysql://${user}:${password}@${DB_HOST}:${port}/${DB_NAME}`;
  }
  return null;
}

const url = resolveConnectionUrl();
export const pool = url
  ? mysql.createPool({ uri: url, waitForConnections: true, connectionLimit: 5, enableKeepAlive: true })
  : null;
export const db = pool ? drizzle(pool, { schema, mode: "default" }) : null;
export const databaseEnabled = Boolean(db);

export async function closeDatabase() {
  if (pool) await pool.end();
}
