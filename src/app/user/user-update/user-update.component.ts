import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription, lastValueFrom, Observable} from "rxjs";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../authorization/api.service";
import {TeamMember} from "../../shared/TeamMember";
import {UploadService} from "../../shared/upload.service";
import {AuthService} from "../../authorization/auth.service";
import {Skills} from "../../shared/skills.model";
import {ProfileModel} from "../../shared/profile.model";

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
  skills: Skills;
  addSkills = false;
  oldSkills: Skills[] = [];
  skill: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private uploadService: UploadService,
    private authService: AuthService) {}

  async ngOnInit() {
    this.getAvatarName();
    let userSkills = new FormArray([]);
    this.updateForm = new FormGroup({
      'title': new FormControl( ),
      'team': new FormControl( ),
      'service': new FormControl( ),
      'proficiency': new FormControl( ),
      'firstName': new FormControl( ),
      'lastName': new FormControl( ),
      'skills': userSkills,
      'expert': new FormControl()
    });

    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.authenticatedUserName = param.get('id')! || '';
    })
    let skillResponse= await this.getUserSkills(this.authenticatedUserName);
    this.skills = skillResponse[0].skills;

    this.initForm();
    this.uploadUrl();
  }

  getAvatarName(){
    const user = this.authService.getAuthenticatedUser()?.getUsername();
    this.userProfilePicName = user!;
  }

  getUserSkills(user: string): Promise<any>{
    let key = 'PK';
    let response = this.apiService.fetchSkills(user, key).toPromise();
    return response;
  }

  private initForm(){
    let userSkills = new FormArray([]);

    try {
      if (this.authenticatedUserName) {
        this.apiService.fetchSingleData(this.authenticatedUserName).subscribe({
          next: (response: TeamMember) => {
            if(this.skills){
              // @ts-ignore
              for(let skill of this.skills){
                // @ts-ignore
                userSkills.push(new FormGroup({
                    'service': new FormControl(skill.service),
                    'proficiency': new FormControl(skill.proficiency)
                  })
                );
                this.oldSkills.push(skill);
                this.skill = true;
              }
            }
            this.oldProficiency = response.proficiency;
            this.updateForm = new FormGroup({
              'title': new FormControl(response.title, Validators.required),
              'team': new FormControl(response.team, Validators.required),
              'firstName': new FormControl(response.first_name, Validators.required),
              'lastName': new FormControl(response.last_name, Validators.required),
              'skills': userSkills
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

    const tempProficieny = (<FormArray>this.updateForm.get('skills')).value;
    for(let prof of tempProficieny){
      if(prof.proficiency == 'Expert'){
        this.updateForm.value.expert = true;
        break;
      } else {
        this.updateForm.value.expert = false;
      }
    }

    const newTeamMemeber = new TeamMember(
      userEmail,
      this.updateForm.value.title,
      this.updateForm.value.team,
      this.updateForm.value.service,
      this.oldProficiency,
      this.updateForm.value.firstName,
      this.updateForm.value.lastName,
      userName,
      this.updateForm.value.skills,
      this.updateForm.value.expert
    );
    this.apiService.updateTeamMember(newTeamMemeber, this.authenticatedUserName, 'profile');
    this.profileData(userName, this.oldSkills, this.updateForm.value.skills);

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
      },
      error: error => {
        console.log(error)
      }
    });
  }

  get Controls(){
    return (<FormArray>this.updateForm.get('skills')).controls;
  }

  onDeleteSkills(index: number){
    (<FormArray>this.updateForm.get('skills')).removeAt(index);
  }

  onAddSkills(){
    this.addSkills = true;
    (<FormArray>this.updateForm.get('skills')).push(
      new FormGroup({
        'service' : new FormControl(null),
        'proficiency' : new FormControl(null)
      })
    );
  }

  async profileData(pk: string, oldSkill: Skills[], newSkill: Skills[]) {
    let skillDeletions: Skills[] = [];
    skillDeletions = this.getDifference(oldSkill, newSkill);
    if (oldSkill.length != newSkill.length) {
      for (let index = 0; index < skillDeletions.length; index++) {
        let PK = this.authenticatedUserName;
        let Sk = 'skill#' + skillDeletions[index].service;
        await this.apiService.deleteSkill(PK, Sk);
        console.log('deleting');
      }
    }
    let profile: ProfileModel;
    let oldSk: string;
    const tempSkills =  (<FormArray>this.updateForm.get('skills')).value;
    for(let index = 0; index < tempSkills.length; index++){
      let sk = 'skill#'+tempSkills[index].service +'#'+tempSkills[index].proficiency;
      if(this.oldSkills[index] == undefined){
        let ser = tempSkills[index].service;
        this.oldSkills.push({
          service: ser,
          proficiency: ''
        });
      }
      oldSk = this.formatSK(this.oldSkills[index]);
      profile = new ProfileModel(pk, oldSk, sk);
      this.apiService.updateSkills(profile, pk, oldSk);
    }
  }

  formatSK(any: Skills){
    let sk = 'skill#'+any.service;
    return sk;
  }

  getDifference(oldSkill: Skills[], newSkill: Skills[]) {
    let skillDeletions: Skills[] = [];
    skillDeletions =  oldSkill.filter(object1 => {
      return !newSkill.some(object2 => {
        return object1.service === object2.service
      });
    });
    return skillDeletions;
  }
}
