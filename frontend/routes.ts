import { Flow } from '@vaadin/flow-frontend';
import { Route } from '@vaadin/router';
import './views/main-layout';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: 'fusion',
    component: 'fusion-view',
    icon: 'la la-atom',
    title: 'Fusion',
    action: async (_context, _command) => {
      await import('./views/fusion/fusion-view');
      return;
    },
  },
  {
    path: 'movie',
    component: 'movie-view',
    icon: 'la la-atom',
    title: 'Movie',
    action: async (_context, _command) => {
      await import('./views/fusion/movie-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [
      ...views,
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];
