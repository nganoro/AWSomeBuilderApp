import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../authorization/auth.service";
import {ApiService} from "../../authorization/api.service";
import {TeamMember} from "../../shared/TeamMember";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onEditPage(){}

}
