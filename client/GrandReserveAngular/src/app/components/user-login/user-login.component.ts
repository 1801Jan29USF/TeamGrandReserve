import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../../beans/game";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  code;
  name;
  team;

  constructor(private client: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  submitGameRegis() {
    let url = (this.code).concat('/').concat(this.team).concat('/').concat(this.name);
    console.log(url);
    this.client.get(`${environment.context}game/add-player/`.concat(url)).subscribe(
      (succ) => {
        this.router.navigateByUrl('/pregame');
      },
      (err) => {
        console.log('failed');
      }
    );
  }
}
