package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import com.example.application.data.AbstractEntity;
import com.vaadin.fusion.Nonnull;

@Entity
public class Movie extends AbstractEntity {

    @Nonnull
    @NotBlank
    private String title;

    @Nonnull
    private int released;

    @Nonnull
    private String tagline;

    public Movie(@Nonnull @NotBlank String title, @Nonnull int released, @Nonnull String tagline) {
        this.title = title;
        this.released = released;
        this.tagline = tagline;
    }

    public Movie(){}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getReleased() {
        return released;
    }

    public void setReleased(int released){
        this.released = released;
    }

    public String getTagline(){
        return tagline;
    }

    public void setTagline(String tagline){
        this.tagline = tagline;
    }
}
