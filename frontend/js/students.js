/**
 * students.js - Logic for the Students list page
 */

const tbody = document.getElementById("students-tbody");
const searchInput = document.getElementById("search-input");
const departmentFilter = document.getElementById("department-filter");

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

/** Load department names into the dropdown */
function loadDepartments() {
    const departments = [...new Set(
        allStudents
            .map(student => student.department)
            .filter(Boolean)
    )];

    departmentFilter.innerHTML = `
        <option value="">All Departments</option>
        ${departments.map(department =>
            `<option value="${department}">${department}</option>`
        ).join("")}
    `;
}

/** Search and filter students */
function searchStudents() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedDepartment = departmentFilter.value;

    const filteredStudents = allStudents.filter(student => {

        const matchesSearch =
            student.firstName.toLowerCase().includes(searchText) ||
            student.lastName.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText) ||
            (student.department || "").toLowerCase().includes(searchText);

        const matchesDepartment =
            !selectedDepartment ||
            student.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

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

    loadDepartments();
    renderStudents(allStudents);
}

/** Search when typing */
searchInput.addEventListener("input", searchStudents);

/** Filter when department changes */
departmentFilter.addEventListener("change", searchStudents);

loadStudents();