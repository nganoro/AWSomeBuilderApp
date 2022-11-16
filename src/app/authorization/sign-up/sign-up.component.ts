import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  confirmUser = false;
  signUpForm: FormGroup;
  confirmForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      'email': new FormControl(),
      'password2': new FormControl(),
      'username2': new FormControl(),
    }),

    this.confirmForm = new FormGroup({
      'usrName': new FormControl(),
      'validationCode': new FormControl(),
    })

  }

  onSubmit() {
    if(!this.signUpForm.valid){
      return;
    }

    const password = this.signUpForm.value.password2;
    const username = this.signUpForm.value.username2;
    const email = this.signUpForm.value.email;

    this.authService.signUp(username, email, password);
    this.onClearItem();
  }

  switchToLogIn(){
    this.router.navigate(['/Authorization']);
  }

  onClearItem() {
    this.signUpForm.reset();
  }

}

