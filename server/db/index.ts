/**
 * Drizzle DB Client — Neon Serverless (WebSocket)
 * 
 * Uses @neondatabase/serverless which connects via WebSocket/HTTP
 * instead of raw TCP, making it compatible with any network environment.
 * Import `db` in any Nitro server route to query the database.
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set.')
}

const sql = neon(connectionString)
export const db = drizzle(sql, { schema })
