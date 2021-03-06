import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from "angular2-cookie/core";

@Injectable()
export class OnTeamGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let myTeam: any = 'b';
    let answeringTeam: any = 'a';
    const cookie = new CookieService;
    myTeam = cookie.getObject('team');
    console.log(myTeam);
    answeringTeam = cookie.getObject('answering-team');
    console.log(answeringTeam);
    return myTeam == answeringTeam;
  }
}
