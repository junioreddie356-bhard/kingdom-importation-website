# Deployment guide

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set a secure value for `ADMIN_SESSION_SECRET`.
3. Run:
   - `npm install`
   - `npm run dev`

## Vercel deployment

1. Push this project to your GitHub repository.
2. Import the repository in Vercel.
3. Add these environment variables in the Vercel dashboard:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy the project.
5. To publish after linking the repo, run:
   - `npx vercel --prod`

> This project is already configured with a Next.js standalone build and Vercel settings, so it is deployment-ready once the repo is connected to a hosting account.

## Render / other Node hosts

1. Set the same environment variables.
2. Use the project root as the deployment directory.
3. Start with `npm install` and `npm run build`.
4. Start the app with `npm run start`.

> This project is configured for a standalone build with Next.js to work well for hosted deployments.
