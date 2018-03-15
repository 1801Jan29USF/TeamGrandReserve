import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from "angular2-cookie/core";

@Injectable()
export class OnTeamGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let myTeam :any = 'b';
    let answeringTeam :any = 'a';
    let cookie = new CookieService;
    myTeam = cookie.getObject('team');
    answeringTeam = cookie.getObject('answering-team');
    return myTeam == answeringTeam;
  }
}
