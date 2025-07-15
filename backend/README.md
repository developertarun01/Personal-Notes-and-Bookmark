# Notes & Bookmark Manager - Backend

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start server: `npm run dev`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes (filter with `q` and `tags` query params)
- `GET /api/notes/:id` - Get a single note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Bookmarks
- Similar endpoints as notes with URL validation
- Auto-fetches title if not provided