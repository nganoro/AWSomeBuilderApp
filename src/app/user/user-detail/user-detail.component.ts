import { Component, OnInit } from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../authorization/auth.service";
import {Observable, Subscription} from "rxjs";
import {UploadService} from "../../shared/upload.service";

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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    const userSession = this.authService.getUserSession();
    console.log(userSession);
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.userName = param.get('id')! || '';
    })
    console.log(this.userName);
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

  ngOnDestroy(){
    this.routeParamObs.unsubscribe();
  }
}
