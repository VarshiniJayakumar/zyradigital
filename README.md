# ZyraDigital Landing Page — MERN Stack

## Project Structure

```
landingpage/
├── client/          # React + Vite + Tailwind CSS frontend
└── server/          # Node.js + Express + MongoDB backend
```

## Prerequisites

- Node.js v18+
- MongoDB running locally on port 27017 (or update MONGO_URI in server/.env)

## Setup & Run

### 1. Start the Backend

```bash
cd server
npm install
npm run dev
```
Server runs on http://localhost:5000

### 2. Start the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:3000

## Environment Variables

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/zyradigital
```

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | /api/enrollment   | Submit enrollment form   |
| GET    | /api/enrollment   | List all enrollments     |

## WhatsApp Link

Update the WhatsApp number in `client/src/components/CTA.jsx`:
```jsx
href="https://wa.me/91XXXXXXXXXX"
```
