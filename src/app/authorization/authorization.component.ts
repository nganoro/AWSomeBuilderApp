import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  confirmUser = false;
  isLoginMode = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  confirmForm: FormGroup;
  isLoading: boolean = false;
  // error: string = null;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl(),
      'username': new FormControl()
    }),
    this.confirmForm = new FormGroup({
      'usrName': new FormControl(),
      'validationCode': new FormControl(),
    }),
    this.signInForm = new FormGroup({
      'email': new FormControl()
    })
  }

  onSwithcMode() {
    this.isLoginMode = !this.isLoginMode;
    if(this.isLoginMode){

    }
  }

  onSubmit() {
    if(!this.signUpForm.valid || !this.signInForm.valid){
      return;
    }
    const email = this.signInForm.value.email;
    const password = this.signUpForm.value.password;
    const username = this.signUpForm.value.username;

    this.isLoading = true;

    if(this.isLoginMode){
      this.authService.signIn(username, password);
      console.log(username, password);
    } else {
      this.authService.signUp(username, email, password);
      console.log(username, email, password);
      this.isLoading = false;
    }
    this.onClearItem();
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm() {
    this.authService.confirmUser(this.confirmForm.value.usrName, this.confirmForm.value.validationCode);
  }

  onClearItem() {
    this.isLoginMode = false;
    this.signUpForm.reset();
    this.signInForm.reset();
  }

}
