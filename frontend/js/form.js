/**
 * form.js - Logic for the Add / Edit Student form (add-student.html)
 *
 * How it works:
 *  - If the URL has ?id=123, it runs in EDIT mode:
 *      → Fetches the student, pre-fills the form, and calls updateStudent on submit.
 *  - Otherwise it runs in ADD mode:
 *      → Calls createStudent on submit.
 *
 * This single file handles both Add and Edit to keep the project simple.
 */

const form     = document.getElementById("student-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");

// Check if we're in Edit mode by looking for ?id= in the URL
const params    = new URLSearchParams(window.location.search);
const studentId = params.get("id");

/** Read the current field values from the form */
function getFormData() {
    return {
        firstName:  document.getElementById("firstName").value.trim(),
        lastName:   document.getElementById("lastName").value.trim(),
        email:      document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        year:       document.getElementById("year").value
                    ? parseInt(document.getElementById("year").value)
                    : null
    };
}

/** Simple client-side validation — returns true if the form is valid */
function validateForm(data) {
    let valid = true;

    // Clear previous errors
    ["firstName", "lastName", "email"].forEach(field => {
        document.getElementById(`${field}-error`).textContent = "";
    });

    if (!data.firstName) {
        document.getElementById("firstName-error").textContent = "First name is required.";
        valid = false;
    }
    if (!data.lastName) {
        document.getElementById("lastName-error").textContent = "Last name is required.";
        valid = false;
    }
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        document.getElementById("email-error").textContent = "A valid email address is required.";
        valid = false;
    }

    return valid;
}

/** If editing, load and pre-fill the student's current data */
async function loadStudentForEdit() {
    formTitle.textContent = "Edit Student";
    submitBtn.textContent = "Update Student";

    try {
        const student = await API.getStudentById(studentId);
        document.getElementById("firstName").value  = student.firstName  || "";
        document.getElementById("lastName").value   = student.lastName   || "";
        document.getElementById("email").value      = student.email      || "";
        document.getElementById("department").value = student.department || "";
        document.getElementById("year").value       = student.year       || "";
    } catch (err) {
        alert("Could not load student data. Redirecting back.");
        window.location.href = "students.html";
    }
}

/** Handle form submission for both Add and Edit */
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!validateForm(data)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    try {
        if (studentId) {
            await API.updateStudent(studentId, data);
        } else {
            await API.createStudent(data);
        }
        window.location.href = "students.html";
    } catch (err) {
        alert("Something went wrong. Please try again.");
        console.error(err);
        submitBtn.disabled = false;
        submitBtn.textContent = studentId ? "Update Student" : "Save Student";
    }
});

// Initialize the page
if (studentId) {
    loadStudentForEdit();
}
