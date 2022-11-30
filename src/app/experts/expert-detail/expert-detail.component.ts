import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {UploadService} from "../../shared/upload.service";

@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.component.html',
  styleUrls: ['./expert-detail.component.css']
})
export class ExpertDetailComponent implements OnInit {

  routedExpert= '';
  routedTeam: TeamMember;
  routeParamObs: Subscription;
  userProfilePic = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.routedExpert = param.get('id')! || '';
    });

    this.getTeamMember();
    this.fetchUrl();
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

}
