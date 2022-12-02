import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../authorization/api.service";
import {TeamMember} from "../../shared/TeamMember";
import {UploadService} from "../../shared/upload.service";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  toFile: any;
  oldProficiency: string;
  updateForm: FormGroup;
  authenticatedUserName = '';
  userProfilePicName = '';
  routeParamObs: Subscription;
  fileUploadUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private uploadService: UploadService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.getAvatarName();
    this.updateForm = new FormGroup({
      'title': new FormControl( ),
      'team': new FormControl( ),
      'service': new FormControl( ),
      'proficiency': new FormControl( ),
      'firstName': new FormControl( ),
      'lastName': new FormControl( )
    });

    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.authenticatedUserName = param.get('id')! || '';
      console.log(this.authenticatedUserName)
      this.initForm();
    })

    this.uploadUrl();
  }

  getAvatarName(){
    const user = this.authService.getAuthenticatedUser()?.getUsername();
    this.userProfilePicName = user!;
  }

  private initForm(){

    try {
      if (this.authenticatedUserName) {
        this.apiService.fetchSingleData(this.authenticatedUserName).subscribe({
          next: (response: TeamMember) => {
            this.oldProficiency = response.proficiency;
            this.updateForm = new FormGroup({
              'title': new FormControl(response.title, Validators.required),
              'team': new FormControl(response.team, Validators.required),
              'service': new FormControl(response.service, Validators.required),
              'proficiency': new FormControl(response.proficiency, Validators.required),
              'firstName': new FormControl(response.first_name, Validators.required),
              'lastName': new FormControl(response.last_name, Validators.required),
            });
          },
          error: error => {
            console.log(error)
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    let userEmail = this.apiService.getUserEmail();
    let userName = this.apiService.getUserName();
    const newTeamMemeber = new TeamMember(
      userEmail,
      this.updateForm.value.title,
      this.updateForm.value.team,
      this.updateForm.value.service,
      this.oldProficiency,
      this.updateForm.value.firstName,
      this.updateForm.value.lastName,
      userName
    );
    console.log(newTeamMemeber);
    this.apiService.updateTeamMember(newTeamMemeber, this.authenticatedUserName, this.oldProficiency);

    if(this.toFile){
      const file = this.toFile.item(0);
      this.uploadService.uploadProfilePic(file, this.fileUploadUrl);
    }
  }

  onChange(event: Event) {
    // @ts-ignore
    this.toFile = event.target.files;
  }

  uploadUrl(){
    this.uploadService.getUploadSignedUrl(this.userProfilePicName).subscribe({
      next: (response: any) => {
        this.fileUploadUrl = response.presigned_url;
        console.log(this.fileUploadUrl);
      },
      error: error => {
        console.log(error)
      }
    });
  }

}
