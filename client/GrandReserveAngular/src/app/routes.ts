import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';

export const appRoutes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'start-screen',
    component: StartScreenComponent
  }
];
