/**
 * students.js - Logic for the Students list page (students.html)
 *
 * Responsibilities:
 *  - Fetch all students from the API on page load
 *  - Render them as rows in the <table>
 *  - Handle the Delete button for each row
 *  - Redirect to the edit form with the student's ID
 */

const tbody = document.getElementById("students-tbody");

/** Render all students as table rows */
function renderStudents(students) {
    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="loading-text">No students found. <a href="add-student.html">Add one!</a></td></tr>`;
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.department || "—"}</td>
            <td>${student.year ? student.year + " Year" : "—"}</td>
            <td>
                <button class="btn btn-edit"
                        onclick="editStudent(${student.id})"
                        id="edit-btn-${student.id}">Edit</button>
                <button class="btn btn-danger"
                        onclick="deleteStudent(${student.id})"
                        id="delete-btn-${student.id}">Delete</button>
            </td>
        </tr>
    `).join("");
}

/** Navigate to the edit form pre-filled with the student's data */
function editStudent(id) {
    window.location.href = `add-student.html?id=${id}`;
}

/** Delete a student after confirming with the user */
async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
        await API.deleteStudent(id);
        loadStudents(); // Refresh the table
    } catch (err) {
        alert("Failed to delete student. Please try again.");
        console.error(err);
    }
}

/** Load students from API and render the table */
async function loadStudents() {
    tbody.innerHTML = `<tr><td colspan="7" class="loading-text">Loading...</td></tr>`;
    const students = await API.getAllStudents();
    renderStudents(students);
}

// Start loading when the page is ready
loadStudents();
