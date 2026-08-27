/**
 * student-details.js
 * Loads and displays a single student's details.
 */

// Get the student ID from the URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

// Get HTML elements
const studentName = document.getElementById("student-name");
const studentIdElement = document.getElementById("student-id");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const department = document.getElementById("department");
const year = document.getElementById("year");
const editBtn = document.getElementById("edit-btn");


/** Load student details */
async function loadStudentDetails() {

    // Check if student ID exists
    if (!studentId) {
        showError("Student ID was not provided.");
        return;
    }

    try {

        // Get student from backend
        const student = await API.getStudentById(studentId);

        // Display student information
        studentName.textContent =
            `${student.firstName || ""} ${student.lastName || ""}`.trim();

        studentIdElement.textContent =
            `Student ID: ${student.id}`;

        firstName.textContent =
            student.firstName || "—";

        lastName.textContent =
            student.lastName || "—";

        email.textContent =
            student.email || "—";

        department.textContent =
            student.department || "—";

        year.textContent =
            student.year
                ? `${student.year} Year`
                : "—";

        // Set edit button link
        editBtn.onclick = function () {
            window.location.href =
                `add-student.html?id=${student.id}`;
        };

    } catch (err) {

        console.error(
            "Error loading student details:",
            err
        );

        showError(
            "Unable to load student details. Please try again."
        );
    }
}


/** Display an error message */
function showError(message) {

    studentName.textContent = "Unable to load";

    studentIdElement.textContent = "";

    firstName.textContent = "—";
    lastName.textContent = "—";
    email.textContent = "—";
    department.textContent = "—";
    year.textContent = "—";

    alert(message);
}


/** Start loading student details */
loadStudentDetails();