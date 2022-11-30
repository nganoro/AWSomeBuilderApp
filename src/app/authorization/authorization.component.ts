import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import { TeamMember } from "../shared/TeamMember";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  confirmUser = false;
  confirmButton = false;
  isLoginMode = true;
  signInForm: FormGroup;
  confirmForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.confirmForm = new FormGroup({
      'usrName': new FormControl(),
      'validationCode': new FormControl(),
    }),
    this.signInForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl(),
    });
    console.log(this.confirmUser);
  }

  switchToSignUp() {
    this.router.navigate(['/signUp']);
  }

  onSubmit() {
    if(!this.signInForm.valid){
      return;
    }
    this.isLoading = true;

    if(this.isLoginMode){
      const password = this.signInForm.value.password;
      const username = this.signInForm.value.username;
      this.authService.signIn(username, password);
      this.confirmButton = true;
    }
    this.onClearItem();
  }

  onDoConfirm() {
    this.confirmUser = true;
    this.confirmButton = true;
  }

  onConfirm() {
    this.authService.confirmUser(this.confirmForm.value.usrName, this.confirmForm.value.validationCode);
    alert('Confirmed!');
  }

  onClearItem() {
    this.isLoginMode = false;
    // this.isLoading = false;
    this.signInForm.reset();
  }

}
