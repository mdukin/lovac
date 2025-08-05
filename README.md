# React + Node.js + PostgreSQL Todo App

A full-stack todo application built with React frontend, Node.js/Express backend, and PostgreSQL database.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Todo Management**: Create, read, update, delete todos
- **Real-time Updates**: Toggle completion status
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- CSS3 with modern styling

### Backend
- Node.js
- Express.js
- PostgreSQL with pg driver
- JWT for authentication
- bcryptjs for password hashing

### Database
- PostgreSQL
- User and Todo tables with relationships

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd react-nodejs-postgresql-app
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
cd ..
```

### 4. Set up PostgreSQL database

Create a PostgreSQL database:
```sql
CREATE DATABASE todoapp;
```

### 5. Configure environment variables

Copy the example environment file and update it:
```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 6. Initialize the database

The application will automatically create the required tables when you start the server. The initialization script includes:
- Users table
- Todos table
- Sample data (optional)

## Running the Application

### Development Mode

1. **Start the backend server:**
```bash
npm run dev
```
The backend will run on http://localhost:5000

2. **Start the frontend (in a new terminal):**
```bash
npm run client
```
The frontend will run on http://localhost:3000

### Production Mode

1. **Build the React app:**
```bash
npm run build
```

2. **Start the production server:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos (Protected routes)
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion
- `DELETE /api/todos/:id` - Delete a todo

### Health Check
- `GET /api/health` - Server health check

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Todos Table
```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
react-nodejs-postgresql-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.js
│   └── package.json
├── config/                 # Backend configuration
│   ├── database.js         # Database connection
│   └── init.sql           # Database initialization
├── middleware/             # Express middleware
│   └── auth.js            # Authentication middleware
├── models/                 # Data models
│   ├── User.js
│   └── Todo.js
├── routes/                 # API routes
│   ├── auth.js
│   └── todos.js
├── server.js              # Main server file
├── package.json
└── README.md
```

## Default User

For testing purposes, a demo user is created with:
- Username: `demo`
- Email: `demo@example.com`
- Password: `password`

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation
- SQL injection prevention with parameterized queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please create an issue in the repository.