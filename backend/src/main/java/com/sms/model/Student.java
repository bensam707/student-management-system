package com.sms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Student Entity - maps to the "students" table in MySQL.
 *
 * @Entity  → tells JPA this class is a database table
 * @Table   → specifies the exact table name
 * @Id     → marks the primary key field
 * @GeneratedValue → auto-increments the ID
 */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 50)
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50)
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Size(max = 100)
    @Column(name = "department")
    private String department;

    @Column(name = "year")
    private Integer year;

    // ── Constructors ──────────────────────────────────────────────────────────

    public Student() {}

    public Student(String firstName, String lastName, String email,
                   String department, Integer year) {
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.email      = email;
        this.department = department;
        this.year       = year;
    }

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId()                    { return id; }
    public void setId(Long id)             { this.id = id; }

    public String getFirstName()           { return firstName; }
    public void setFirstName(String fn)    { this.firstName = fn; }

    public String getLastName()            { return lastName; }
    public void setLastName(String ln)     { this.lastName = ln; }

    public String getEmail()               { return email; }
    public void setEmail(String email)     { this.email = email; }

    public String getDepartment()          { return department; }
    public void setDepartment(String dept) { this.department = dept; }

    public Integer getYear()               { return year; }
    public void setYear(Integer year)      { this.year = year; }
}
