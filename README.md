This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all the dependencies with npm install and then run a migration to create your database tables with Prisma Migrate and to seed your database with some initial data. Finally, you can start the development server with npm run dev.

```bash:
npm install
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

### Coffee Routes
- http://localhost:3000/api/coffee/ping - GET
- http://localhost:3000/api/coffee - GET
- http://localhost:3000/api/coffee/<:id> - GET
- http://localhost:3000/api/coffee/create - POST
- http://localhost:3000/api/coffee/delete/<:id> - DELETE

### Post Routes
- http://localhost:3000/api/post/ping - GET
- http://localhost:3000/api/post - GET, POST
- http://localhost:3000/api/post/<:id> - GET, DELETE
