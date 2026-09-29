// Creates the waitlist table. Run once: node --env-file=.env.local scripts/migrate.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL);

await sql`
  create table if not exists waitlist (
    id bigint generated always as identity primary key,
    email text not null unique,
    consent text not null,
    created_at timestamptz not null default now()
  )
`;

const [{ count }] = await sql`select count(*)::int as count from waitlist`;
console.log(`waitlist table ready, ${count} rows`);
