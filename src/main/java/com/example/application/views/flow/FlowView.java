package com.example.application.views.flow;

import com.example.application.data.entity.Person;
import com.example.application.data.service.PersonService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Flow")
@Route(value = "")
public class FlowView extends VerticalLayout {
    private PersonService service;
    Grid<Person> grid = new Grid<>(Person.class);

    public FlowView(PersonService service) {
        this.service = service;

        var form = new Form();

        grid.setColumns("firstName", "lastName", "email");
        grid.asSingleSelect().addValueChangeListener(e -> {
            form.setPerson(e.getValue());
        });

        add(grid, form);
        update();
    }

    void update() {
        grid.setItems(service.findAll());
    }

    class Form extends FormLayout {
        TextField firstName = new TextField("First name");
        TextField lastName = new TextField("Last name");
        EmailField email = new EmailField("Email");
        Binder<Person> binder = new BeanValidationBinder<>(Person.class);
        private Person person;

        Form() {
            var saveButton = new Button("Save");
            binder.bindInstanceFields(this);

            add(firstName, lastName, email, saveButton);

            saveButton.addClickListener(click -> {
                try {
                    binder.writeBean(person);
                    service.save(person);
                    update();
                } catch (Exception e) {
                    // TODO: handle exception
                }
            });
        }

        void setPerson(Person person) {
            this.person = person;
            binder.readBean(person);
        }
    }
}
