/**
 * api.js - Centralized API communication layer
 *
 * All fetch() calls to the Spring Boot backend live here.
 * Other JS files import from this object instead of writing
 * their own fetch calls, keeping the code DRY (Don't Repeat Yourself).
 *
 * Base URL points to the Spring Boot server running on port 8080.
 */

const API_BASE = "https://student-management-system-production-fcd5.up.railway.app/api";

const API = {

    /** GET /api/students — returns array of all students */
    async getAllStudents() {
        try {
            const response = await fetch(`${API_BASE}/students`);
            if (!response.ok) throw new Error("Failed to fetch students");
            return await response.json();
        } catch (error) {
            console.error("API Error - getAllStudents:", error);
            return [];
        }
    },

    /** GET /api/students/:id — returns a single student object */
    async getStudentById(id) {
        const response = await fetch(`${API_BASE}/students/${id}`);
        if (!response.ok) throw new Error(`Student with id ${id} not found`);
        return await response.json();
    },

    /** POST /api/students — creates a new student, returns saved object */
    async createStudent(studentData) {
        const response = await fetch(`${API_BASE}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });
        if (!response.ok) throw new Error("Failed to create student");
        return await response.json();
    },

    /** PUT /api/students/:id — updates existing student, returns updated object */
    async updateStudent(id, studentData) {
        const response = await fetch(`${API_BASE}/students/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });
        if (!response.ok) throw new Error("Failed to update student");
        return await response.json();
    },

    /** DELETE /api/students/:id — deletes a student */
    async deleteStudent(id) {
        const response = await fetch(`${API_BASE}/students/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete student");
        return true;
    }
};
