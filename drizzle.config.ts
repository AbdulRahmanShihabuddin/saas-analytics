/**
 * Drizzle Kit config — uses the postgres driver for schema push/migrations
 * Note: drizzle-kit uses direct TCP; for dev push use the Neon non-pooler direct URL
 * or use the neon-http driver for runtime queries (server/db/index.ts)
 */
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './server/db/schema.ts',
    out: './server/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})
