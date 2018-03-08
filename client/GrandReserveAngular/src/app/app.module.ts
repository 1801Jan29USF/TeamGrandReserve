import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from '@uirouter/angular';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { appRoutes } from './routes';
import { MenuComponent, NgbdModalContentComponent } from './components/menu/menu.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';


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
    NgbdModalContentComponent,
    StartScreenComponent
  ],
  providers: [

  ],
  entryComponents: [
    NgbdModalContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
