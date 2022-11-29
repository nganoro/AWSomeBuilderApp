import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../authorization/api.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Teams} from "../../shared/Teams";
import {TeamMember} from "../../shared/TeamMember";


@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent implements OnInit {

  routedTeam= '';
  currentTeam: Teams;
  routeParamObs: Subscription;
  teamUsernames: any[] = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.routedTeam = param.get('id')! || '';
    });

    this.fetchSingleTeam();
    this.fetchTeamUsernames();
  }

  fetchSingleTeam(){
    this.apiService.fetchSingleTeam(this.routedTeam).subscribe({
      next: (response: any) => {
        console.log(response);
        this.currentTeam = response;
        console.log(this.currentTeam);
      },
      error: error => {
        console.log(error)
      }
    });
  }

  fetchTeamUsernames(){
    this.apiService.fetchTeamUsernames(this.routedTeam).subscribe({
      next: (response) => {
        console.log(response);
        this.teamUsernames = response; // if api is chosen, get what origianlArray gives
      },
      error: error => {
        console.log(error)
      }
    });
  }
}


