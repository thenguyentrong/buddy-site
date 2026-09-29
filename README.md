# Buddy waitlist site

Landing page and waitlist for [Buddy](https://github.com/thenguyentrong/watch-ai), the private AI agent on your watch.

- Next.js 16 and Tailwind 4, on Vercel (project `heybuddy`).
- Sign-ups go to a Neon Postgres database in Frankfurt (`buddy-waitlist`, Neon free plan through Vercel).
  Only the email address, the time and the consent sentence are stored. No cookies, no analytics.
- Buddy on the watch face is drawn from frames exported from the app's own animation engine
  (`public/buddy-frames.json`): resting, listening while you type, happy once you've joined.

Run it locally:

```
vercel env pull .env.local
node --env-file=.env.local scripts/migrate.mjs   # once, creates the table
npm run dev
```

Live at https://heybuddy-watch.vercel.app.
