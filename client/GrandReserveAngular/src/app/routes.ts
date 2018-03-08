import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import {PregameComponent} from "./components/pregame/pregame.component";

export const appRoutes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'pregame',
    component: PregameComponent
  }
];
