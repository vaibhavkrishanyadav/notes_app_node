# Notes App Node

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Overview

Notes App is a Node.js-based backend for a simple note-taking application. It provides RESTful API endpoints for creating, retrieving, updating, and deleting notes. It also provides features to search notes based on keywords from its content and also allow users to share notes. 

## Features

- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on notes.
- **User Authentication:** Secure endpoints with user authentication.
- **Sharing:** Allow users to share notes to other users.
- **Search :** Can search notes .
- **Data Validation:** Ensure data integrity with input validation.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/vaibhavkrishanyadav/notes_app_node.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

4. Access the API at `https://notes-server-oncn.onrender.com`.

## API Routes

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Authenticate and generate a JWT token.
- **GET /api/auth/current:** Show details of logined user.

### Notes Routes

- **GET /api/notes:** Retrieve all notes for the authenticated user.
- **GET /api/notes/:id:** Retrieve a specific note.
- **POST /api/notes:** Create a new note.
  - Example Request:
    ```json
    {
      "title": "New Note",
      "body": "This is a new note."
    }
    ```
- **PUT /api/notes/:id:** Update a specific note.
  - Example Request:
    ```json
    {
      "title": "Updated Note",
      "body": "This note has been updated."
    }
    ```
- **DELETE /api/notes/:id:** Delete a specific note.
- **GET /api/search/?q=searchedword:** Return a list of all notes containg the searched word.
- **POST /api/notes/noteid/share:** Share a note with other user.

## Postman Collection

Explore the API routes and examples in the [Postman Collection](https://www.postman.com/vaibhavkrishanyadav/workspace/notes-server-vaibhav).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.