# 🎓 Student Management System

A full-stack web application built with **Java Spring Boot**, **MySQL**, and **HTML/CSS/JavaScript**.

---

## 📁 Project Structure

```
student-management-system/
├── backend/                        # Spring Boot backend (Java)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/sms/
│   │       │   ├── controller/     # REST API endpoints
│   │       │   ├── service/        # Business logic
│   │       │   ├── repository/     # Database queries (JPA)
│   │       │   ├── model/          # Entity classes (DB tables)
│   │       │   └── StudentManagementApplication.java
│   │       └── resources/
│   │           └── application.properties  # DB config, server port
│   └── pom.xml                     # Maven dependencies
│
└── frontend/                       # Vanilla HTML/CSS/JS frontend
    ├── index.html                  # Landing / dashboard page
    ├── students.html               # Student list page
    ├── add-student.html            # Add / edit student form
    ├── css/
    │   └── style.css               # Global styles
    └── js/
        ├── api.js                  # All fetch() calls to the backend
        ├── students.js             # Logic for student list page
        └── form.js                 # Logic for add/edit student form
```

---

## 🛠️ Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Backend  | Java 17, Spring Boot 3.x    |
| Database | MySQL 8.x                   |
| ORM      | Spring Data JPA (Hibernate) |
| Frontend | HTML5, CSS3, JavaScript ES6 |

---

## 🗓️ 7-Day Plan

| Day | Goal |
|-----|------|
| 1   | Project setup & DB connection |
| 2   | Student model, repository & basic CRUD API |
| 3   | Service layer + test APIs with Postman |
| 4   | Frontend dashboard & student list page |
| 5   | Add / Edit student form (frontend + API wiring) |
| 6   | Delete student + validation + error handling |
| 7   | Final polish, README, and demo |

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8+
- A browser (Chrome, Firefox, etc.)

### 1. Database Setup
```sql
CREATE DATABASE student_management;
```

### 2. Configure the Backend
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Run the Backend
```bash
cd backend
mvn spring-boot:run
```
The API will be available at `http://localhost:8080`

### 4. Open the Frontend
Simply open `frontend/index.html` in your browser.

---

## 📡 API Endpoints (Planned)

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| GET    | /api/students        | Get all students    |
| GET    | /api/students/{id}   | Get student by ID   |
| POST   | /api/students        | Add new student     |
| PUT    | /api/students/{id}   | Update student      |
| DELETE | /api/students/{id}   | Delete student      |
