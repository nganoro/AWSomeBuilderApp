import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  confirmUser = false;
  confirmButton = false;
  confirmForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.confirmForm = new FormGroup({
      'usrName': new FormControl(),
      'validationCode': new FormControl(),
    })
  }

  onConfirm() {
    this.authService.confirmUser(this.confirmForm.value.usrName, this.confirmForm.value.validationCode);
    window.alert('Confirmed!');
    this.router.navigate(['/Authorization']);
  }

}
