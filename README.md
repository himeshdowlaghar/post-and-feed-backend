# Post and Feed Backend

A simple Express.js backend for uploading posts with images and captions.

## Features
- Image upload to ImageKit (cloud storage)
- Store posts with captions in MongoDB
- Retrieve all posts
- Delete posts

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer
- **Cloud Storage**: ImageKit

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/postandfeedproject.git
   cd postandfeedproject/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the Backend folder
   ```
   MONGODB_URI=your_mongodb_connection_string
   IMAGEKIT_KEY=your_imagekit_api_key
   PORT=3456
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

Server runs on `http://localhost:3456`

## API Endpoints

- `GET /` - Home endpoint
- `POST /upload` - Upload image with caption
- `GET /posts` - Get all posts
- `DELETE /posts/:id` - Delete a post

## Project Structure
```
Backend/
├── src/
│   ├── app.js           # Main Express app with routes
│   ├── db/
│   │   ├── connection.js # MongoDB connection
│   │   └── model.js     # Mongoose schema
│   └── storage/
│       ├── multer.js    # Multer configuration
│       └── storage.image.js # ImageKit integration
├── server.js            # Entry point
├── package.json
└── .env                 # Environment variables (not committed)
```
