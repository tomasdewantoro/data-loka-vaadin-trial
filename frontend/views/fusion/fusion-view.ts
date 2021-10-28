import '@vaadin/grid';
import { GridActiveItemChangedEvent } from '@vaadin/grid';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/button';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import { Binder, field } from '@vaadin/form';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonService } from 'Frontend/generated/endpoints';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';

@customElement('fusion-view')
export class FusionView extends View {
  @state()
  people: Person[] = [];
  @state()
  selected?: Person;
  binder = new Binder(this, PersonModel);

  async connectedCallback() {
    super.connectedCallback();
    this.people = await PersonService.findAll();
  }

  activeChanged(e: GridActiveItemChangedEvent<Person>) {
    this.selected = e.detail.value;
    if (this.selected) {
      this.binder.read(this.selected);
    } else {
      this.binder.clear();
    }
  }

  async save() {
    const saved = await this.binder.submitTo(PersonService.save);
    if (saved) {
      this.people = this.people.map((existing) =>
        existing.id === saved.id ? saved : existing
      );
      this.selected = undefined;
      this.binder.clear();
    }
  }

  render() {
    const { model } = this.binder;
    return html`
      <vaadin-grid
        .items=${this.people}
        @active-item-changed=${this.activeChanged}
        .selectedItems=${[this.selected]}>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>

      <div class="grid grid-cols-2 gap-m items-baseline">
        <vaadin-text-field
          label="First name"
          ${field(model.firstName)}></vaadin-text-field>
        <vaadin-text-field
          label="Last name"
          ${field(model.lastName)}></vaadin-text-field>
        <vaadin-email-field
          label="Email"
          ${field(model.email)}></vaadin-email-field>
        <vaadin-button @click=${this.save}>Save</vaadin-button>
      </div>
    `;
  }
}
