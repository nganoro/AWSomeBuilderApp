import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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

  constructor(
    private apiService: ApiService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'email': new FormControl(),
      'title': new FormControl(),
      'team': new FormControl(),
      'service': new FormControl(),
      'proficiency': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl()
    })
  }

  onSubmit(){
    if(!this.profileForm.valid){
      return;
    }

    const newTeamMemeber = new TeamMember(
      this.profileForm.value.email,
      this.profileForm.value.title,
      this.profileForm.value.team,
      this.profileForm.value.service,
      this.profileForm.value.proficiency,
      this.profileForm.value.firstName,
      this.profileForm.value.lastName
    );

    this.apiService.onStoreData(newTeamMemeber);
  }

}
