package com.sms.service;

import com.sms.model.Student;
import com.sms.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * StudentService - the Business Logic Layer.
 *
 * This layer sits between the Controller and the Repository.
 * It keeps the business rules separate from the API layer.
 * Methods here will grow as you add more logic (e.g., validations,
 * email uniqueness checks, pagination).
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Constructor injection (preferred over @Autowired field injection)
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /** Retrieve all students from the database */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /** Retrieve a single student by their ID */
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    /** Save a new student to the database */
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    /** Update an existing student's details */
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existing.setFirstName(updatedStudent.getFirstName());
        existing.setLastName(updatedStudent.getLastName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setDepartment(updatedStudent.getDepartment());
        existing.setYear(updatedStudent.getYear());

        return studentRepository.save(existing);
    }

    /** Delete a student by their ID */
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
