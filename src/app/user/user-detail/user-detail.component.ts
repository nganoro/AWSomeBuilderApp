import { Component, OnInit } from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public teamMember: TeamMember;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getTeamMember();
  }

  getTeamMember(){
    this.apiService.fetchSingleData().subscribe({
      next: (response) => {
        console.log(response);
        this.teamMember = response;
      },
      error: error => {
        console.log(error)
      }
    });
  }
}
