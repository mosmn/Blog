# Blog RESTful API (or RESTish)

This is a RESTful API for a blogging platform. It allows users to create, read, update, and delete blog posts. Users can also like and unlike posts, and add, delete, like, and unlike comments.

This project serves as the backend for two frontend applications:

1. **Blog Admin**: An administrative interface where all the posts can be created, updated, and deleted by the admin.
2. **Portfolio**: A public-facing site where users can read and engage with the blog posts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installing

1. Clone the repository:
```sh
git clone https://github.com/mosmn/blog-api.git
```

2. Install the dependencies:
```sh
npm install
```

3. Create a [`.env`](command:_github.copilot.openRelativePath?%5B%22.env%22%5D ".env") file in the root directory of the project and add the following environment variables:
```sh
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```sh
npm start
```

## API Endpoints

All routes are prefixed with `/blog`.

- `GET /posts`: Get all posts.
- `GET /posts/:id`: Get a specific post.
- `POST /posts`: Create a new post. Requires admin privileges.
- `PUT /posts/:id`: Update a specific post. Requires admin privileges.
- `DELETE /posts/:id`: Delete a specific post. Requires admin privileges.
- `PATCH /posts/:id/like`: Like a specific post.
- `PATCH /posts/:id/unlike`: Unlike a specific post.
- `GET /posts/:id/comments`: Get all comments for a specific post.
- `POST /posts/:id/comments`: Add a comment to a specific post.
- `DELETE /posts/:id/comments/:commentId`: Delete a specific comment. Requires the user to be the author of the comment or an admin.
- `PATCH /comments/:id/like`: Like a specific comment.
- `PATCH /comments/:id/unlike`: Unlike a specific comment.

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js
- [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Implementation of JSON Web Tokens
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library to hash and check passwords

## License

This project is licensed under the ISC License.