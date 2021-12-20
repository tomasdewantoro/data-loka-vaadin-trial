
import "@vaadin/horizontal-layout/src/vaadin-horizontal-layout";
import "@vaadin/date-picker/src/vaadin-date-picker";
import "@vaadin/form-layout/src/vaadin-form-layout";
import "@vaadin/split-layout/src/vaadin-split-layout";
import "@vaadin/grid/src/vaadin-grid-sort-column";import '@vaadin/grid';
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
    this.classList.add('flex', 'flex-col', 'h-full');
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
  private cancel() {
    this.selected = undefined;
  }

  render() {
    return html`
      <vaadin-split-layout class="w-full h-full">
        <div class="flex-grow w-full">
          <vaadin-grid
            id="grid"
            class="w-full h-full"
            theme="no-border"
            .items=${this.movies}
            @active-item-changed=${this.activeChanged}
          >
            <vaadin-grid-sort-column auto-width path="title"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="released"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="tagline"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="flex flex-col" style="width: 400px;">
          <div class="p-l flex-grow">
            <vaadin-form-layout>
              <vaadin-text-field
                label="Title"
                id="title"
                ${field(this.binder.model.title)}
              ></vaadin-text-field
              ><vaadin-text-field
                label="Released"
                id="released"
                ${field(this.binder.model.released)}
              ></vaadin-text-field
              ></vaadin-text-field
              >
              <vaadin-text-field label="Tagline" id="tagline" ${field(this.binder.model.tagline)}></vaadin-text-field>
              </vaadin-text-field>
            </vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout class="w-full flex-wrap bg-contrast-5 py-s px-l" theme="spacing">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancel}>Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }
}
