import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';

@customElement('fusion-view')
export class FusionView extends View {
  render() {
    return html`<h1>Hello, world!</h1>`;
  }
}
