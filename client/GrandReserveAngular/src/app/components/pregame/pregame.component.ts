import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Game } from '../../beans/game';
import { environment } from '../../../environments/environment';
import { Instructor } from '../../beans/instructor';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css']
})
export class PregameComponent implements OnInit {
  game: Game;
  instructor: Instructor;
  // this is all dummy values for testing
  redTeam = [
    {
      name: '1',
      leader: false

    },
    {
      name: '2',
      leader: false
    },
    {
      name: '3',
      leader: false
    },
    {
      name: '4',
      leader: true
    }
  ];
  blueTeam = [
    {
      name: 'b1',
      leader: false
    },
    {
      name: 'b2',
      leader: false
    },
    {
      name: 'b3',
      leader: true
    },
    {
      name: 'b4',
      leader: false
    }
  ];

  constructor(private client: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  setLeader(player) {
    if (!player.leader) {
      if (this.redTeam.includes(player)) {
        this.redTeam.forEach(function (value) {
          if (value.leader) {
            value.leader = false;
          }
        });
      } else if (this.blueTeam.includes(player)) {
        this.blueTeam.forEach(function (value) {
          if (value.leader) {
            value.leader = false;
          }
        });
      }
      player.leader = true;
      alert('This player is now the leader');
    } else {
      alert('This player is already the leader.');
    }
  }

  startGame(name) {
    this.client.post(`${environment.context}game/create`, name).subscribe(
      (succ: Game) => {
        this.game = succ;
        console.log(this.game);
        this.router.navigateByUrl('/menu');
      },
      (err) => {
        console.log('failed');
      }
    );
  }

}
