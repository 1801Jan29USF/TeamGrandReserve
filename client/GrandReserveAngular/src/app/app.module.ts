import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from '@uirouter/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { appRoutes } from './routes';
import { MenuComponent } from './components/menu/menu.component';
import { PregameComponent } from './components/pregame/pregame.component';
import {QuestionComponent} from "./components/question/question.component";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,

  ],
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    PregameComponent,
    QuestionComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
