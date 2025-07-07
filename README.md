# Jobs API

A RESTful API for managing job applications built with Node.js, Express, and MongoDB. This API allows users to register, authenticate, and manage their job applications with full CRUD operations.

**Author:** [Sanjeet Kumar](https://github.com/CodingWithSanjeet)  
**GitHub:** https://github.com/CodingWithSanjeet

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Job Management**: Full CRUD operations for job applications
- **Security**: Comprehensive security with helmet, CORS, XSS protection, and rate limiting
- **Error Handling**: Centralized error handling with custom error classes
- **Input Validation**: Robust validation using Mongoose schemas and validators
- **Database**: MongoDB with Mongoose ODM
- **Password Security**: Bcrypt hashing for password protection

## 🌐 Live Demo

The API is deployed and ready to use:
- **Production URL**: https://jobs-api-ib9p.onrender.com
- **Status**: ✅ Live and running

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Express Rate Limit, XSS Sanitizer
- **Password Hashing**: Bcrypt
- **Environment Variables**: Dotenv
- **Development**: Nodemon

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodingWithSanjeet/jobs-api.git
   cd jobs-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/jobs-api
   JWT_TOKEN=your-super-secure-jwt-secret-key
   JWT_LIFETIME=30d
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm start
   
   # Production mode
   NODE_ENV=production node app.js
   ```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_TOKEN` | JWT secret key | Required |
| `JWT_LIFETIME` | JWT token expiration time | `30d` |

## 📚 API Documentation

### Base URLs
**Local Development:**
```
http://localhost:5000/api/v1
```

**Production:**
```
https://jobs-api-ib9p.onrender.com/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User Registered Successfully.",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User logged in successfully",
  "data": {
    "token": "jwt_token_here"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Job Endpoints

> **Note**: All job endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

#### Get All Jobs
```http
GET /jobs
```

**Response:**
```json
{
  "status": "success",
  "message": "Jobs fetched successfully!",
  "data": {
    "jobs": [
      {
        "_id": "job_id",
        "company": "Tech Corp",
        "position": "Software Developer",
        "status": "pending",
        "createdBy": "user_id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 1
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Single Job
```http
GET /jobs/:id
```

#### Create Job
```http
POST /jobs
```

**Request Body:**
```json
{
  "company": "Tech Corp",
  "position": "Software Developer",
  "status": "pending"
}
```

#### Update Job
```http
PATCH /jobs/:id
```

**Request Body:**
```json
{
  "company": "Updated Tech Corp",
  "position": "Senior Software Developer",
  "status": "interview"
}
```

#### Delete Job
```http
DELETE /jobs/:id
```

## 📊 Job Status Options

Jobs can have one of the following statuses:
- `pending` - Initial status for new job applications
- `interview` - Job application moved to interview stage
- `declined` - Job application was declined

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15-minute window per IP
- **Helmet**: Sets various HTTP headers for security
- **CORS**: Cross-Origin Resource Sharing enabled
- **XSS Protection**: Sanitizes user input to prevent XSS attacks
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds for password security

## 🏗️ Project Structure

```
jobs-api/
├── app.js                 # Main application file
├── controllers/           # Route controllers
│   ├── authController.js  # Authentication logic
│   └── jobsController.js  # Job management logic
├── db/
│   └── connect.js         # Database connection
├── errors/                # Custom error classes
│   ├── AppError.js
│   ├── BadRequestError.js
│   ├── ForbiddenError.js
│   ├── NotFoundError.js
│   ├── UnauthorizedError.js
│   └── index.js
├── helper/
│   └── response.js        # Response formatting utilities
├── middlewares/           # Custom middleware
│   ├── authentication.js # JWT authentication middleware
│   ├── error-handler.js   # Global error handler
│   └── not-found.js       # 404 handler
├── models/                # Mongoose models
│   ├── Job.js
│   └── User.js
├── routes/                # Route definitions
│   ├── authRoute.js
│   └── jobsRoute.js
├── utils/
│   └── asyncErrorHandler.js
├── package.json
└── README.md
```

## 🧪 Testing

Currently, the project doesn't include tests. Consider adding:
- Unit tests with Jest
- Integration tests with Supertest
- API testing with Postman/Newman

## 🚀 Deployment

### Current Deployment
The API is currently deployed on **Render** and accessible at:
- **Production URL**: https://jobs-api-ib9p.onrender.com/api/v1

### Alternative Deployment Options

#### Using PM2 (Production)
```bash
npm install -g pm2
pm2 start app.js --name jobs-api
pm2 startup
pm2 save
```

#### Using Docker
```dockerfile
# Create Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]
```

#### Deploy to Render
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on git push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- No pagination implemented for job listings
- No advanced filtering or search functionality
- No email verification for user registration
- No password reset functionality

## 🔮 Future Enhancements

- [ ] Add pagination and filtering for jobs
- [ ] Implement email verification
- [ ] Add password reset functionality
- [ ] Add job application attachments
- [ ] Implement user roles and permissions
- [ ] Add job application analytics
- [ ] Add email notifications
- [ ] Implement job sharing features

## 📞 Support

For support, please create an issue in the repository or contact [Sanjeet Kumar](https://github.com/CodingWithSanjeet).

---

**Happy Coding! 🚀** 
