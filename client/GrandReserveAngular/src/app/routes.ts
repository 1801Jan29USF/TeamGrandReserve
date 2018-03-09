import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import {QuestionComponent} from "./components/question/question.component";
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { PregameComponent } from './components/pregame/pregame.component';

export const appRoutes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {

    path: 'start-screen',
    component: StartScreenComponent
  },
  {
    path: 'pregame',
    component: PregameComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'start-screen'
  }
];
