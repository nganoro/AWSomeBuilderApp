import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../authorization/api.service";
import {TeamMember} from "../../shared/TeamMember";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  profileForm: FormGroup;
  newUserName: string;
  newUserEmail: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
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
    });
    this.initForm();
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
      this.newUserName
    );

    console.log(newTeamMemeber);

    this.apiService.onStoreData(newTeamMemeber);
    this.profileForm.reset();
  }

  private initForm() {

    try {
      if (this.newUserName) {
        this.profileForm = new FormGroup({
          'email': new FormControl(),
          'title': new FormControl(),
          'team': new FormControl(),
          'service': new FormControl(),
          'proficiency': new FormControl(),
          'firstName': new FormControl(),
          'lastName': new FormControl(),
          'userName': new FormControl(this.newUserName, Validators.required),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
