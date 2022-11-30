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

  public username = '';
  teamMember: TeamMember;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.username = this.apiService.getUserName();
    this.fetchUserInfo();
  }

  fetchUserInfo(){
    this.apiService.fetchSingleData(this.username).subscribe({
      next: (response: any) => {
        this.teamMember = response;
        console.log(this.teamMember);
      },
      error: error => {
        console.log(error)
      }
    });
  }
}
