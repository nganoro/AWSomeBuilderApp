import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../../authorization/api.service";
import {TeamMember} from "../../shared/TeamMember";
import {AuthService} from "../../authorization/auth.service";
import {ProfileModel} from "../../shared/profile.model";
import {UploadService} from "../../shared/upload.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  toFile: any;
  profileForm: FormGroup;
  newUserName: string;
  newUserEmail: string;
  fileUploadUrl: string;
  userProfilePicName = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.getAvatarName();
    let userSkills = new FormArray([]);
    this.newUserName = this.apiService.getUserName();
    this.newUserEmail = this.apiService.getUserEmail();
    this.profileForm = new FormGroup({
      'email': new FormControl(),
      'title': new FormControl(),
      'team': new FormControl(),
      'service': new FormControl(),
      'proficiency': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'userName': new FormControl(),
      'skills': userSkills
    });
    this.uploadUrl();
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      return;
    }

    const newTeamMemeber = new TeamMember(
      this.newUserEmail,
      this.profileForm.value.title,
      this.profileForm.value.team,
      this.profileForm.value.service,
      this.profileForm.value.proficiency,
      this.profileForm.value.firstName,
      this.profileForm.value.lastName,
      this.newUserName,
      this.profileForm.value.skills
    );

    console.log(newTeamMemeber);

    this.apiService.onStoreData(newTeamMemeber);
    this.profileData(this.newUserName);
    if(this.toFile){
      const file = this.toFile.item(0);
      this.uploadService.uploadProfilePic(file, this.fileUploadUrl);
    }
    this.profileForm.reset();
  }

  onAddSkills(){
    (<FormArray>this.profileForm.get('skills')).push(
      new FormGroup({
        'service' : new FormControl(null),
        'proficiency' : new FormControl(null)
      })
    );
  }

  get Controls(){
    return (<FormArray>this.profileForm.get('skills')).controls;
  }

  onDeleteSkills(index: number){
    (<FormArray>this.profileForm.get('skills')).removeAt(index);
  }

  profileData(pk: string){
    let profile: ProfileModel;
    const tempSkills =  (<FormArray>this.profileForm.get('skills')).value;
    for(let o of tempSkills){
      let sk = 'skill#'+o.service +'#'+o.proficiency;
      profile = new ProfileModel(pk, sk);
      this.apiService.storeSkills(profile);
    }
  }

  getAvatarName(){
    const user = this.authService.getAuthenticatedUser()?.getUsername();
    this.userProfilePicName = user!;
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
