import { Component, OnInit } from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {AuthService} from "../../authorization/auth.service";
import {ApiService} from "../../authorization/api.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.css']
})
export class ExpertSearchComponent implements OnInit {

  public teamMember: TeamMember[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData(){
    this.apiService.fetchAllData().subscribe({
        next: (response) => {
            this.teamMember = response;
            console.log(this.teamMember);
        },
        error: error => {
          console.log(error)
        }
      });
  }
}
