package com.example.application.data.entity;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import com.example.application.data.AbstractEntity;
import com.vaadin.fusion.Nonnull;

@Entity
public class Person extends AbstractEntity {

    @Nonnull
    @NotBlank
    private String firstName;

    @Nonnull
    @NotBlank
    private String lastName;

    @Email
    @Nonnull
    @NotBlank
    private String email;

    @Past
    private LocalDate dateOfBirth;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    // public Person(String firstName){
    //     this.firstName = firstName;
    // }
}
