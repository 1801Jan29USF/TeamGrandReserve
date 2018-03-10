import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from '@uirouter/angular';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { appRoutes } from './routes';

import { MenuComponent, NgbdModalContentComponent } from './components/menu/menu.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { PregameComponent } from './components/pregame/pregame.component';
import {QuestionComponent} from './components/question/question.component';
import { GameOverComponent } from './components/game-over/game-over.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    QuestionComponent,
    NgbdModalContentComponent,
    StartScreenComponent,
    PregameComponent,
    GameOverComponent
  ],
  providers: [

  ],
  entryComponents: [
    NgbdModalContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
