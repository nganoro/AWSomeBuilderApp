import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  isLoginMode = true;
  signInForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl(),
    });
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
    }
    this.onClearItem();
  }

  onClearItem() {
    this.isLoginMode = false;
    // this.isLoading = false;
    this.signInForm.reset();
  }

}
