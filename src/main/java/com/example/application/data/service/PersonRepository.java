package com.example.application.data.service;

import com.example.application.data.entity.Person;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vaadin.fusion.Nonnull;
import javax.validation.constraints.Email;
import java.time.LocalDate;

public interface PersonRepository extends JpaRepository<Person, Integer> {

}