package com.example.application.data.service;

import java.util.List;
import com.example.application.data.entity.Movie;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import org.springframework.stereotype.Service;

@Service
@Endpoint
@AnonymousAllowed
public class MovieService {

    private MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Movie> findAll() {
        return repository.findAll();
    }

    public Movie save(Movie movie) {
        return repository.save(movie);
    }
}
