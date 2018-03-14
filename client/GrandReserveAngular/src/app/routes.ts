import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { QuestionComponent } from './components/question/question.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { PregameComponent } from './components/pregame/pregame.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import {OnTeamGuard} from "./guards/onTeamGuard/on-team.guard";


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
    component: QuestionComponent,
    canActivate: [OnTeamGuard]
  },
  {

    path: 'game-over',
    component: GameOverComponent
  },
  {
    path: 'student-login',
    component: UserLoginComponent
  },
  {
    path: 'instructor-login',
    component: InstructorLoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'start-screen'
  }
];
