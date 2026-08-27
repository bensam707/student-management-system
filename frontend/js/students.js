/**
 * students.js - Logic for the Students list page
 */

const tbody = document.getElementById("students-tbody");
const searchInput = document.getElementById("search-input");
const departmentFilter = document.getElementById("department-filter");
const sortSelect = document.getElementById("sort-select");

let allStudents = [];


/** Render students in the table */
function renderStudents(students) {

    if (students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="loading-text">
                    No students found.
                </td>
            </tr>
        `;
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
                <button
                    class="btn btn-view"
                    onclick="viewStudent(${student.id})">
                    View
                </button>

                <button
                    class="btn btn-edit"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="btn btn-danger"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}


/** Load department names into dropdown */
function loadDepartments() {

    const departments = [...new Set(
        allStudents
            .map(student => student.department)
            .filter(Boolean)
    )];

    departmentFilter.innerHTML = `
        <option value="">All Departments</option>

        ${departments.map(department => `
            <option value="${department}">
                ${department}
            </option>
        `).join("")}
    `;
}


/** Search, filter and sort students */
function updateStudentList() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedDepartment =
        departmentFilter.value;

    const sortValue =
        sortSelect.value;


    // 1. Search and department filter
    let filteredStudents = allStudents.filter(student => {

        const firstName =
            (student.firstName || "").toLowerCase();

        const lastName =
            (student.lastName || "").toLowerCase();

        const email =
            (student.email || "").toLowerCase();

        const department =
            (student.department || "").toLowerCase();


        const matchesSearch =
            firstName.includes(searchText) ||
            lastName.includes(searchText) ||
            email.includes(searchText) ||
            department.includes(searchText);


        const matchesDepartment =
            !selectedDepartment ||
            student.department === selectedDepartment;


        return matchesSearch && matchesDepartment;
    });


    // 2. Sort the filtered students
    if (sortValue === "name-asc") {

        filteredStudents.sort((a, b) =>
            (a.firstName || "").localeCompare(
                b.firstName || ""
            )
        );

    } else if (sortValue === "name-desc") {

        filteredStudents.sort((a, b) =>
            (b.firstName || "").localeCompare(
                a.firstName || ""
            )
        );

    } else if (sortValue === "department") {

        filteredStudents.sort((a, b) =>
            (a.department || "").localeCompare(
                b.department || ""
            )
        );

    } else if (sortValue === "year-asc") {

        filteredStudents.sort((a, b) =>
            Number(a.year || 0) - Number(b.year || 0)
        );

    } else if (sortValue === "year-desc") {

        filteredStudents.sort((a, b) =>
            Number(b.year || 0) - Number(a.year || 0)
        );
    }


    // 3. Display the final result
    renderStudents(filteredStudents);
}


/** Navigate to student details page */
function viewStudent(id) {

    window.location.href =
        `student-details.html?id=${id}`;
}


/** Navigate to edit page */
function editStudent(id) {

    window.location.href =
        `add-student.html?id=${id}`;
}


/** Delete a student */
async function deleteStudent(id) {

    if (!confirm(
        "Are you sure you want to delete this student?"
    )) {
        return;
    }

    try {

        await API.deleteStudent(id);

        await loadStudents();

    } catch (err) {

        alert(
            "Failed to delete student. Please try again."
        );

        console.error("Error deleting student:", err);
    }
}


/** Load students */
async function loadStudents() {

    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="loading-text">
                Loading students...
            </td>
        </tr>
    `;

    try {

        allStudents = await API.getAllStudents();

        loadDepartments();

        updateStudentList();

    } catch (err) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="error-message">
                    <div>
                        <strong>Unable to load students</strong>

                        <p>
                            Please check if the backend server is running.
                        </p>

                        <button
                            class="btn btn-primary"
                            onclick="loadStudents()">
                            Try Again
                        </button>
                    </div>
                </td>
            </tr>
        `;

        console.error("Error loading students:", err);
    }
}


/** Search when typing */
searchInput.addEventListener(
    "input",
    updateStudentList
);


/** Filter when department changes */
departmentFilter.addEventListener(
    "change",
    updateStudentList
);


/** Sort when selection changes */
sortSelect.addEventListener(
    "change",
    updateStudentList
);


/** Start loading students */
loadStudents();