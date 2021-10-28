package com.example.application.data.service;

import java.util.List;
import com.example.application.data.entity.Person;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import org.springframework.stereotype.Service;

@Service
@Endpoint
@AnonymousAllowed
public class PersonService {

    private PersonRepository repository;

    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Person> findAll() {
        return repository.findAll();
    }

    public Person save(Person person) {
        return repository.save(person);
    }
}
