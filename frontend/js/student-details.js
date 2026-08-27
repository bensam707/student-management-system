/**
 * student-details.js - Logic for Student Details page
 */

// Get student ID from URL
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
const deleteBtn = document.getElementById("delete-btn");


/** Load student details */
async function loadStudentDetails() {

    // Check if student ID exists
    if (!studentId) {
        alert("Student ID not found.");
        window.location.href = "students.html";
        return;
    }

    try {

        const student = await API.getStudentById(studentId);

        // Display student information
        studentName.textContent =
            `${student.firstName} ${student.lastName}`;

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

    } catch (err) {

        console.error("Error loading student:", err);

        alert("Could not load student details.");

        window.location.href = "students.html";
    }
}


/** Edit student */
editBtn.addEventListener("click", function () {

    window.location.href =
        `add-student.html?id=${studentId}`;

});


/** Delete student */
deleteBtn.addEventListener("click", async function () {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await API.deleteStudent(studentId);

        alert("Student deleted successfully.");

        window.location.href = "students.html";

    } catch (err) {

        console.error("Error deleting student:", err);

        alert(
            "Failed to delete student. Please try again."
        );
    }
});


/** Load the student when page opens */
loadStudentDetails();