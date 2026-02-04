import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Details} from './details/details';
import {HousingLocationForm} from './housing-location-form/housing-location-form';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Home details'
  },
  {
    path: 'form',
    component: HousingLocationForm,
    title: 'Creation Form'
  }
];
