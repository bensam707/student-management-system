/**
 * students.js - Logic for the Students list page
 */

const tbody = document.getElementById("students-tbody");
const searchInput = document.getElementById("search-input");

let allStudents = [];

/** Render students in the table */
function renderStudents(students) {
    if (students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="loading-text">
                    No students found.
                </td>
            </tr>`;
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
                        onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button class="btn btn-danger"
                        onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

/** Search students */
function searchStudents() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredStudents = allStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchText) ||
        student.lastName.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        (student.department || "").toLowerCase().includes(searchText)
    );

    renderStudents(filteredStudents);
}

/** Navigate to edit page */
function editStudent(id) {
    window.location.href = `add-student.html?id=${id}`;
}

/** Delete a student */
async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
        await API.deleteStudent(id);
        loadStudents();
    } catch (err) {
        alert("Failed to delete student. Please try again.");
        console.error(err);
    }
}

/** Load students */
async function loadStudents() {
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="loading-text">Loading...</td>
        </tr>`;

    allStudents = await API.getAllStudents();
    renderStudents(allStudents);
}

/** Search whenever the user types */
searchInput.addEventListener("input", searchStudents);

loadStudents();