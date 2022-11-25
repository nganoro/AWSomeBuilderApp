import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../authorization/api.service";
import {TeamMember} from "../../shared/TeamMember";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public oldProficiency: string;
  updateForm: FormGroup;
  authenticatedUserName = '';
  routeParamObs: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService) {}

  ngOnInit(): void {

    this.updateForm = new FormGroup({
      'email': new FormControl( ),
      'title': new FormControl( ),
      'team': new FormControl( ),
      'service': new FormControl( ),
      'proficiency': new FormControl( ),
      'firstName': new FormControl( ),
      'lastName': new FormControl( ),
      'userName': new FormControl( ),
    });

    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.authenticatedUserName = param.get('id')! || '';
      console.log(this.authenticatedUserName)
      this.initForm();
    })
  }

  private initForm(){

    try {
      if (this.authenticatedUserName) {
        this.apiService.fetchSingleData(this.authenticatedUserName).subscribe({
          next: (response: TeamMember) => {
            this.oldProficiency = response.proficiency;
            this.updateForm = new FormGroup({
              'email': new FormControl(response.email, Validators.required),
              'title': new FormControl(response.title, Validators.required),
              'team': new FormControl(response.team, Validators.required),
              'service': new FormControl(response.service, Validators.required),
              'proficiency': new FormControl(response.proficiency, Validators.required),
              'firstName': new FormControl(response.first_name, Validators.required),
              'lastName': new FormControl(response.last_name, Validators.required),
              'userName': new FormControl(response.user_name, Validators.required),
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
    const newTeamMemeber = new TeamMember(
      this.updateForm.value.email,
      this.updateForm.value.title,
      this.updateForm.value.team,
      this.updateForm.value.service,
      this.oldProficiency,
      this.updateForm.value.firstName,
      this.updateForm.value.lastName,
      this.updateForm.value.userName
    );
    this.apiService.updateTeamMember(newTeamMemeber, this.authenticatedUserName, this.oldProficiency);
  }


}
