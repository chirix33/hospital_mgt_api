# Node.js/TypeScript with Prisma

This is a modern Node.js/TypeScript project using Prisma ORM. This is project for my Spring 2025 Back End Development Class, under the instruction of  [Professor Raj Krishnan (Microsoft)](https://www.linkedin.com/in/raj-krishnan).

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

## External API Integration

This project integrates with the FDA (Food and Drug Administration) API to provide drug information. The integration is implemented through the `/pharmacy` endpoint.

### FDA API Endpoint

The application uses the FDA's Drug Labeling API to fetch detailed information about medications. The endpoint is:
```
https://api.fda.gov/drug/label.json
```

### Usage

To query drug information, make a POST request to `/pharmacy` with the following parameters:
- Request Body (JSON):
  ```json
  {
    "name": "aspirin"
  }
  ```
- Query Parameters:
  - `limit`: (Optional) Number of results to return (default: 1)

Example request:
```bash
curl -X POST "http://localhost:3000/pharmacy?limit=1" \
     -H "Content-Type: application/json" \
     -d '{"name": "aspirin"}'
```

### Response Format

The API returns detailed drug information including:
- Active ingredients
- Purpose
- Indications and usage
- Warnings
- Dosage and administration
- Safety information
- Package labeling

### Important Notes

1. The FDA API is a public API and does not require authentication for basic usage
2. Rate limits may apply based on FDA's terms of service
3. The data returned is for informational purposes only and should not be used as a substitute for professional medical advice

For more information about the FDA API, visit: https://open.fda.gov/apis/drug/label/ 