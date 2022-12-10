import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {Teams} from "../../shared/Teams";

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.css']
})
export class TeamSearchComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  teams: Teams[] = [];
  searchText: any;

  constructor(
    private router: Router,
    private apiService: ApiService) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.fetchTeam();
  }

  fetchTeam(){
    this.apiService.fetchAllTeams().subscribe({
      next: (response: any) => {
        this.teams = response;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  showRow(team: Teams) {
    console.log(team);
    this.router.navigate(['/teams/', team.PK]);
  }
}
