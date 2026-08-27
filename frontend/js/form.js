/**
 * form.js - Logic for the Add / Edit Student form
 */

const form = document.getElementById("student-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");

const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

/** Read form values */
function getFormData() {
    return {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        year: document.getElementById("year").value
            ? parseInt(document.getElementById("year").value)
            : null
    };
}

/** Validate form data */
function validateForm(data) {
    let valid = true;

    // Clear previous errors
    document.getElementById("firstName-error").textContent = "";
    document.getElementById("lastName-error").textContent = "";
    document.getElementById("email-error").textContent = "";

    // First name validation
    if (!data.firstName) {
        document.getElementById("firstName-error").textContent =
            "First name is required.";
        valid = false;
    } else if (!/^[A-Za-z ]+$/.test(data.firstName)) {
        document.getElementById("firstName-error").textContent =
            "First name should contain letters only.";
        valid = false;
    }

    // Last name validation
    if (!data.lastName) {
        document.getElementById("lastName-error").textContent =
            "Last name is required.";
        valid = false;
    } else if (!/^[A-Za-z ]+$/.test(data.lastName)) {
        document.getElementById("lastName-error").textContent =
            "Last name should contain letters only.";
        valid = false;
    }

    // Email validation
    if (!data.email) {
        document.getElementById("email-error").textContent =
            "Email address is required.";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        document.getElementById("email-error").textContent =
            "Please enter a valid email address.";
        valid = false;
    }

    // Department validation
    if (data.department && !/^[A-Za-z0-9 &.-]+$/.test(data.department)) {
        alert("Department contains invalid characters.");
        valid = false;
    }

    // Year validation
    if (data.year !== null && (data.year < 1 || data.year > 4)) {
        alert("Year must be between 1 and 4.");
        valid = false;
    }

    return valid;
}

/** Load student data when editing */
async function loadStudentForEdit() {
    formTitle.textContent = "Edit Student";
    submitBtn.textContent = "Update Student";

    try {
        const student = await API.getStudentById(studentId);

        document.getElementById("firstName").value =
            student.firstName || "";

        document.getElementById("lastName").value =
            student.lastName || "";

        document.getElementById("email").value =
            student.email || "";

        document.getElementById("department").value =
            student.department || "";

        document.getElementById("year").value =
            student.year || "";

    } catch (err) {
        alert("Could not load student data. Redirecting back.");
        window.location.href = "students.html";
    }
}

/** Handle form submission */
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = getFormData();

    // Stop if validation fails
    if (!validateForm(data)) {
        return;
    }

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
        submitBtn.textContent =
            studentId ? "Update Student" : "Save Student";
    }
});

/** Initialize edit mode */
if (studentId) {
    loadStudentForEdit();
}