package com.sms.repository;

import com.sms.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * StudentRepository - the Data Access Layer (DAL).
 *
 * By extending JpaRepository<Student, Long>, Spring Data JPA automatically
 * provides implementations for common DB operations:
 *   - findAll()        → SELECT * FROM students
 *   - findById(id)     → SELECT * FROM students WHERE id = ?
 *   - save(student)    → INSERT or UPDATE
 *   - deleteById(id)   → DELETE FROM students WHERE id = ?
 *
 * You can also add custom query methods here in later days, e.g.:
 *   List<Student> findByDepartment(String department);
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom query methods will go here as the project grows
    // Example: List<Student> findByDepartment(String department);
}
