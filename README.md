This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Meeting scheduler popup (email notification)

The **“Schedule a Meeting Now”** button opens a popup where the user can select:
- date
- time
- email
- description

On submit, the app calls `POST /api/schedule-meeting` and sends an email notification to `francemazzi@gmail.com` (or a custom destination).

### Required environment variables

Create a `.env.local` file in the project root with:

```bash
# Destination email (defaults to francemazzi@gmail.com)
MEETING_NOTIFICATION_EMAIL=francemazzi@gmail.com

# Sender identity (defaults to SMTP_USER if using SMTP)
MEETING_FROM_EMAIL=francemazzi@gmail.com

# Sender display name (defaults to "Frasma")
MEETING_FROM_NAME=Frasma

# --- Option A (recommended): Gmail SMTP via App Password ---
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=francemazzi@gmail.com
SMTP_PASS=your_gmail_app_password

# --- Option B: Resend ---
# RESEND_API_KEY=your_resend_api_key
```

Notes:
- In production you should set these variables in your hosting provider (e.g. Vercel).
- If neither SMTP nor Resend is configured, the API returns an error and the popup shows it to the user.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
