import '@vaadin/grid';
import { GridActiveItemChangedEvent } from '@vaadin/grid';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/button';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { PersonService } from 'Frontend/generated/endpoints';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';
import { Binder, field } from '@vaadin/form';

@customElement('fusion-view')
export class FusionView extends View {
  render() {
    return html` <h1>Hello, Fusion!</h1> `;
  }
}
