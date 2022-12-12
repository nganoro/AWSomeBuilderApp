import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {UploadService} from "../../shared/upload.service";
import {Skills} from "../../shared/skills.model";
import {Store} from "@ngrx/store";
import {selectSkill} from "../../shared/user-state-store/user.selector";

@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.component.html',
  styleUrls: ['./expert-detail.component.css']
})
export class ExpertDetailComponent implements OnInit {

  routedExpert= '';
  routeParamObs: Subscription;
  userProfilePic = '';
  newTeam: TeamMember;
  selectedSkill$: Observable<Skills>;
  currentUserSkills: Skills[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private uploadService: UploadService,
    private store: Store) {
      this.selectedSkill$ = store.select(selectSkill);
    }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.routedExpert = param.get('id')! || '';
    });

    this.getTeamMember();
    this.fetchUrl();
    this.getUserSkills(this.routedExpert);
  }

  getTeamMember(){
    this.apiService.fetchSingleData(this.routedExpert).subscribe({
      next: (response: any) => {
        this.newTeam = response;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  fetchUrl(){
    this.uploadService.getFetchSignedUrl(this.routedExpert).subscribe({
      next: (response: any) => {
        this.userProfilePic = response.presigned_url;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  getUserSkills(user: string){
    let key = 'PK';
    this.apiService.fetchSkills(user, key).subscribe({
      next: (response) => {
        for(let skill of response[0].skills){
          this.currentUserSkills.push(skill);
        }
      },
      error: error => {
        console.log(error)
      }
    });
  }

}
