This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setup

1. Install the packages

```bash
npm install
```

2. Setup the env variables

```bash
cp .env.local.example .env.local
```

You can find env variables for _staging_ in our wiki 🤫

### Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result 🎉

### Creating user profile

1. On the homepage click on "Nabízím pomoc"
2. Fill out the form
3. (If you are using staging env variables) Run [Run Staging scripts](https://github.com/cesko-digital/pomahejukrajine-worker/actions/workflows/run-staging-scripts.yaml) action on GitHub to get confirmation email immediatelly
4. Verfy the email address and create a password
5. Now you can log in into your profile by clicking on "Moje nabídky"
