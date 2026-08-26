# 🎓 Student Management System

A simple full-stack web application for managing student records.

The system allows users to add, view, edit, and delete student information through a web interface.

## ✨ Features

* Add new students
* View all students
* Edit student details
* Delete students
* Dashboard with total student count
* Department count
* Form validation
* REST API for student management
* MySQL database integration

## 🛠️ Technologies Used

| Layer           | Technology                  |
| --------------- | --------------------------- |
| Frontend        | HTML5, CSS3, JavaScript     |
| Backend         | Java 17, Spring Boot        |
| Database        | MySQL 8                     |
| ORM             | Spring Data JPA / Hibernate |
| Build Tool      | Maven                       |
| Version Control | Git & GitHub                |

## 📁 Project Structure

```text
student-management-system/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/sms/
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── repository/
│   │       │   └── model/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── index.html
│   ├── students.html
│   ├── add-student.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js
│       ├── students.js
│       └── form.js
│
├── .gitignore
└── README.md
```

## 🗄️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE student_management;
```

The application uses the following database:

```text
Database: student_management
Username: root
```

Configure your local MySQL password in:

```text
backend/src/main/resources/application.properties
```

**Note:** This file is ignored by Git so that database credentials are not uploaded to the public GitHub repository.

## 🚀 How to Run

### 1. Start MySQL

Make sure your MySQL server is running.

### 2. Start the Backend

Open a terminal in the `backend` folder:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 3. Start the Frontend

Open the `frontend` folder using a local web server such as Five Server / Live Server.

Open:

```text
frontend/index.html
```

The dashboard will then open in your browser.

## 📡 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/students`      | Get all students    |
| GET    | `/api/students/{id}` | Get a student by ID |
| POST   | `/api/students`      | Add a new student   |
| PUT    | `/api/students/{id}` | Update a student    |
| DELETE | `/api/students/{id}` | Delete a student    |

## 🔄 CRUD Operations

The project demonstrates the four basic database operations:

* **Create** → Add a student
* **Read** → View students
* **Update** → Edit student details
* **Delete** → Remove a student

## 👨‍💻 Project Status

The core Student Management System is complete and the main CRUD operations have been tested successfully.

Future improvements could include:

* Admin login
* Student search and filtering
* Attendance management
* Department-wise reports
* Export student data
* Improved dashboard charts

## 📌 Project

**Student Management System**

Built as a 7-day mini project using Java Spring Boot, MySQL, HTML, CSS, JavaScript, Git, and GitHub.
