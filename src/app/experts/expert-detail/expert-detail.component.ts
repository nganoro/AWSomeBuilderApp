import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";

@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.component.html',
  styleUrls: ['./expert-detail.component.css']
})
export class ExpertDetailComponent implements OnInit {

  routedExpert= '';
  routedTeam: TeamMember;
  routeParamObs: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.routedExpert = param.get('id')! || '';
    });

    this.getTeamMember();
  }

  getTeamMember(){
    this.apiService.fetchSingleData(this.routedExpert).subscribe({
      next: (response: any) => {
        console.log(response)
        this.routedTeam = response;
      },
      error: error => {
        console.log(error)
      }
    });
  }

}
