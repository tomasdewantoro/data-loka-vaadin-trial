package com.example.application.views.flow;

import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Flow")
@Route(value = "")
public class FlowView extends VerticalLayout {

    public FlowView() {
        add(new H1("Hello, world!"));
    }

}
