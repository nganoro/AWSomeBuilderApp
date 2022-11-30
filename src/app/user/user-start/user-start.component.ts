import { Component, OnInit } from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.css']
})
export class UserStartComponent implements OnInit {

  username = '';
  teamMember: TeamMember;

  constructor(
    private apiService: ApiService) { }

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
