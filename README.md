# Blog RESTful API (or RESTish)

This is a RESTful API for a blogging platform. It allows users to create, read, update, and delete blog posts. Users can also like and unlike posts, and add, delete, like, and unlike comments.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installing

1. Clone the repository:
```sh
git clone https://github.com/yourusername/blog-api.git
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

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js
- [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Implementation of JSON Web Tokens
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library to hash and check passwords

## License

This project is licensed under the ISC License.