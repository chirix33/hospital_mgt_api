# Node.js/TypeScript with Prisma

This is a modern Node.js/TypeScript project using Prisma ORM.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm run prisma:generate`: Generate Prisma Client
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:studio`: Open Prisma Studio to view/edit data

## Project Structure

- `src/`: Source code directory
- `prisma/`: Prisma schema and migrations
- `dist/`: Compiled JavaScript files 