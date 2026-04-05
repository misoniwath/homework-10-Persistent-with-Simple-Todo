# Persistent Todo App

A server-rendered Todo app that persists data using MongoDB Atlas or Supabase (PostgreSQL). The database provider is selected via `DB_TYPE` using a factory.

## Requirements

- Node.js 18+
- MongoDB Atlas connection string **or** Supabase project with a `todos` table

## Supabase Table

Create a table named `todos` with these columns:

- `id` (uuid, primary key, default `gen_random_uuid()`)
- `text` (text, required)
- `completed` (boolean, default `false`)
- `created_at` (timestamp, default `now()`)

## Setup

1. Copy the example env file and fill in credentials.

2. Install dependencies and start the app.

## Scripts

- `npm run dev` starts the server
- `npm start` starts the server
