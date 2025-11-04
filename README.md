# Tip-Note

A modern, full-stack note-taking application built with Spring Boot and React. Tip-Note provides a clean and intuitive interface for creating, managing, and organizing your notes with secure authentication.

## 🌟 Features

- **User Authentication**: Secure JWT-based authentication system with login and registration
- **Note Management**: Create, read, update, and delete notes with ease
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Beautiful UI built with Tailwind CSS that works on all devices
- **Real-time Updates**: Instant synchronization of notes across your session
- **Pinned Notes**: Mark important notes for quick access (UI ready)
- **Modern UI/UX**: Clean, professional interface with smooth transitions and animations

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

### Backend
- **Spring Boot 3.5** - Java-based backend framework
- **Spring Security** - Authentication and authorization
- **JWT** - Token-based authentication
- **JPA/Hibernate** - ORM for database operations
- **PostgreSQL** - Relational database
- **Gradle** - Build automation tool

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend static files

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** and **Docker Compose** (recommended for easy setup)
- OR for manual setup:
  - **Node.js** 20+ and **npm**
  - **Java** 21+
  - **PostgreSQL** 15+
  - **Gradle** 8.9+

## 🚀 Quick Start with Docker

The easiest way to run the entire application is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/Madreeban0/Tip-Note.git
cd Tip-Note

# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up -d

# Check if all containers are running
docker-compose ps
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **PostgreSQL**: localhost:5432

To stop the application:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

## 💻 Manual Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Note-Backend
```

2. Configure database connection in `src/main/resources/application.properties` (if not using Docker):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/notesdb
spring.datasource.username=notesuser
spring.datasource.password=notespass
```

3. Build and run the backend:
```bash
# Using Gradle wrapper
./gradlew clean bootRun

# Or build JAR and run
./gradlew clean bootJar
java -jar build/libs/*.jar
```

The backend will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Note-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/App.jsx` if needed:
```javascript
const API_URL = 'http://localhost:8080';
```

4. Start the development server:
```bash
npm run dev
```

The frontend will start on http://localhost:5173 (Vite dev server)

### Database Setup

If running PostgreSQL manually:

```bash
# Create database and user
psql -U postgres
CREATE DATABASE notesdb;
CREATE USER notesuser WITH PASSWORD 'notespass';
GRANT ALL PRIVILEGES ON DATABASE notesdb TO notesuser;
```

## 🏗️ Project Structure

```
Tip-Note/
├── Note-Backend/           # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/Tip_note/Note/
│   │   │   │       ├── Controllers/     # REST API endpoints
│   │   │   │       ├── Models/          # Entity classes (User, Note)
│   │   │   │       ├── Repository/      # JPA repositories
│   │   │   │       └── Security/        # JWT & authentication
│   │   │   └── resources/
│   │   └── test/
│   ├── build.gradle         # Gradle build configuration
│   └── Dockerfile           # Backend container image
│
├── Note-Frontend/          # React frontend application
│   ├── src/
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Application entry point
│   │   └── assets/         # Static assets
│   ├── public/             # Public static files
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.cjs # Tailwind CSS configuration
│   └── DockerFile          # Frontend container image
│
├── docker-compose.yaml     # Multi-container orchestration
└── README.md              # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token

### Notes (Requires Authentication)
- `GET /api/notes` - Get all notes for authenticated user
- `POST /api/notes` - Create a new note
- `GET /api/notes/{id}` - Get a specific note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

All authenticated requests require the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🎨 Development

### Frontend Development
```bash
cd Note-Frontend

# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development
```bash
cd Note-Backend

# Run with auto-reload (if configured)
./gradlew bootRun

# Run tests
./gradlew test

# Build production JAR
./gradlew clean bootJar
```

## 🌐 Environment Variables

### Backend
- `SPRING_DATASOURCE_URL` - Database connection URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password

### Frontend
- Update `API_URL` in `src/App.jsx` to point to your backend server

## 📦 Building for Production

### Using Docker
```bash
# Build all images
docker-compose build

# Run in production mode
docker-compose up -d
```

### Manual Build

**Backend:**
```bash
cd Note-Backend
./gradlew clean bootJar
java -jar build/libs/*.jar
```

**Frontend:**
```bash
cd Note-Frontend
npm run build
# Serve the dist/ directory with Nginx or any web server
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Madreeban0**

- GitHub: [@Madreeban0](https://github.com/Madreeban0)

## 🙏 Acknowledgments

- Spring Boot team for the excellent backend framework
- React team for the powerful UI library
- Vite team for the blazing-fast build tool
- Tailwind CSS for the utility-first CSS framework

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by Madreeban0
