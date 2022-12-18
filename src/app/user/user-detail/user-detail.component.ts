import { Component, OnInit } from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../authorization/auth.service";
import {Subscription} from "rxjs";
import {UploadService} from "../../shared/upload.service";
import {Skills} from "../../shared/skills.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  teamMember: TeamMember;
  userName = '';
  routeParamObs: Subscription;
  userProfilePic: string;
  skills: Skills[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.userName = param.get('id')! || '';
    })
    this.getUserSkills(this.userName);
    this.getTeamMember();
    this.fetchUrl();
  }

  getTeamMember(){
    this.apiService.fetchSingleData(this.userName).subscribe({
      next: (response: any) => {
        if(response === undefined || response === null){
          this.router.navigate(["/User"]);
        } else {
          this.teamMember = response;
        }
      },
      error: error => {
        console.log(error)
      }
    });
  }

  fetchUrl(){
    this.uploadService.getFetchSignedUrl(this.userName).subscribe({
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
          this.skills.push(skill);
        }
      },
      error: error => {
        console.log(error)
      }
    });
  }

  onNavigate(team: string){
    this.router.navigate(['/teams/', team]);
  }

  ngOnDestroy(){
    this.routeParamObs.unsubscribe();
  }
}
