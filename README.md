# News Explorer API (Backend)

This repository contains the backend API for the News Explorer application.  
The server handles user authentication, article storage, and communication with the frontend client.

The API allows users to register, log in, save news articles, and delete saved articles from their personal account.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Celebrate / Joi validation
- bcrypt for password hashing
- ESLint (airbnb-base configuration)

---

## Features

- User registration
- User authentication using JWT
- Secure password hashing
- Protected API routes
- Save news articles to MongoDB
- Delete saved articles
- Validation for requests using Celebrate/Joi
- Centralized error handling
- Logging of requests and errors

---

## API Routes

### Authentication

| Method | Route     | Description                      |
| ------ | --------- | -------------------------------- |
| POST   | `/signup` | Register a new user              |
| POST   | `/signin` | Authenticate user and return JWT |

### Users

| Method | Route       | Description                  |
| ------ | ----------- | ---------------------------- |
| GET    | `/users/me` | Get current user information |

### Articles

| Method | Route                  | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| GET    | `/articles`            | Get all saved articles for the user |
| POST   | `/articles`            | Save a new article                  |
| DELETE | `/articles/:articleId` | Delete a saved article              |

Only the owner of an article can delete it.

---

## Project Structure

```text
backend
│
├── controllers
│   ├── users.js
│   └── articles.js
│
├── models
│   ├── user.js
│   └── article.js
│
├── routes
│   ├── users.js
│   ├── articles.js
│   └── index.js
│
├── middleware
│   ├── auth.js
│   ├── validation.js
│   ├── errorHandler.js
│   └── logger.js
│
├── errors
│   ├── BadRequestError.js
│   ├── UnauthorizedError.js
│   ├── ForbiddenError.js
│   └── NotFoundError.js
│
├── app.js
└── package.json
```

---

## Running the Project Locally

### 1. Clone the repository

```
git clone <repository-url>
```

### 2. Install dependencies

```
npm install
```

### 3. Start the development server

```
npm run dev
```

### Production start

```
npm run start
```

The server runs at:

```
http://localhost:3000
```

---

## Environment Variables

For production deployment the following variables should be stored in a `.env` file:

```
PORT=3000
MONGO_URI=<mongodb connection string>
JWT_SECRET=<secret key>
```

The `.env` file should not be committed to the repository.

---

## Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

Workflow:

1. User registers using `/signup`
2. User logs in using `/signin`
3. Server returns a JWT token
4. The client stores the token
5. Protected routes require the token in the Authorization header

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Error Handling

The API returns appropriate HTTP status codes:

| Status | Meaning      |
| ------ | ------------ |
| 400    | Bad Request  |
| 401    | Unauthorized |
| 403    | Forbidden    |
| 404    | Not Found    |
| 409    | Conflict     |
| 500    | Server Error |

All errors are handled through a centralized error handler.

---

## Deployment

The backend API must be deployed to a remote server and accessible via HTTPS.

Example:

```
https://api.your-domain.com
```

The frontend client communicates with this API to authenticate users and store saved articles.

---

## Author

Adil Muhammad Khan  
Solutions Architect – State of Missouri

---

## License

This project was developed as part of the TripleTen Software Engineering program.
