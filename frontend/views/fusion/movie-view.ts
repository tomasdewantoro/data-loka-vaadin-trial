import '@vaadin/grid';
import { GridActiveItemChangedEvent } from '@vaadin/grid';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/button';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import { Binder, field } from '@vaadin/form';
import Movie from 'Frontend/generated/com/example/application/data/entity/Movie';
import { MovieService } from 'Frontend/generated/endpoints';
import MovieModel from 'Frontend/generated/com/example/application/data/entity/MovieModel';

@customElement('movie-view')
export class FusionView extends View {
  @state()
  movies: Movie[] = [];
  @state()
  selected?: Movie;
  binder = new Binder(this, MovieModel);

  async connectedCallback() {
    super.connectedCallback();
    this.movies = await MovieService.findAll();
  }

  activeChanged(e: GridActiveItemChangedEvent<Movie>) {
    this.selected = e.detail.value;
    if (this.selected) {
      this.binder.read(this.selected);
    } else {
      this.binder.clear();
    }
  }

  async save() {
    const saved = await this.binder.submitTo(MovieService.save);
    if (saved) {
      this.movies = this.movies.map((existing) =>
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
        .items=${this.movies}
        @active-item-changed=${this.activeChanged}
        .selectedItems=${[this.selected]}>
        <vaadin-grid-column path="title"></vaadin-grid-column>
        <vaadin-grid-column path="released"></vaadin-grid-column>
        <vaadin-grid-column path="tagline"></vaadin-grid-column>
      </vaadin-grid>

      <div class="grid grid-cols-2 gap-m items-baseline">
        <vaadin-text-field
          label="Title"
          ${field(model.title)}></vaadin-text-field>
        <vaadin-text-field
          label="Released"
          ${field(model.released)}></vaadin-text-field>
        <vaadin-email-field
          label="Tagline"
          ${field(model.tagline)}></vaadin-email-field>
        <vaadin-button @click=${this.save}>Save</vaadin-button>
      </div>
    `;
  }
}
