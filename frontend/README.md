# Notes & Bookmark Manager

A full-stack application for managing personal notes and bookmarks.

## Features
- Create, read, update, delete notes and bookmarks
- Search and filter by tags
- Auto-fetch bookmark titles
- User authentication
- Responsive design

## Technologies
- Backend: Node.js, Express, MongoDB
- Frontend: React, Tailwind CSS
- Authentication: JWT

## Setup

### Backend
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start server: `npm run dev`

### Frontend
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## API Documentation

### Notes
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes (optional query params: q, tags)
- `GET /api/notes/:id` - Get a single note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Bookmarks
- Similar endpoints as notes