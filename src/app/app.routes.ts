import { Routes } from '@angular/router';
import {ListJuguetes} from './components/web/list-juguetes/list-juguetes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list-juguetes',
    pathMatch: 'full',
  },
  {
    path: 'list-juguetes',
    component: ListJuguetes
  },
  {
    path: 'list-juguetes',
    component: ListJuguetes
  },

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];
