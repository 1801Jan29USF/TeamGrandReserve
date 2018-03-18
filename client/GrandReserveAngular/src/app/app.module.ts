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
import {CookieService} from 'angular2-cookie/core';

import { appRoutes } from './routes';

import { MenuComponent, NgbdModalContentComponent } from './components/menu/menu.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { PregameComponent } from './components/pregame/pregame.component';

import {QuestionComponent, NgbdModalCorrectComponent} from './components/question/question.component';
import { WebsocketService } from './services/websocket.service';
import { StompService } from 'ng2-stomp-service';
import { GameOverComponent } from './components/game-over/game-over.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import {OnTeamGuard} from './guards/onTeamGuard/on-team.guard';
import { WaitingLobbyComponent } from './components/waiting-lobby/waiting-lobby.component';



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
    NgbdModalCorrectComponent,
    StartScreenComponent,
    PregameComponent,
    GameOverComponent,
    UserLoginComponent,
    InstructorLoginComponent,
    WaitingLobbyComponent
  ],
  providers: [
    WebsocketService,
    StompService,
    CookieService,
    OnTeamGuard
  ],
  entryComponents: [
    NgbdModalContentComponent,
    NgbdModalCorrectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
