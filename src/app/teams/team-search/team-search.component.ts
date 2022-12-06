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
  resetTeams: Teams[] = [];
  searchText: any;
  currentTeam: string;
  teamUsernames: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.fetchTeam();
    console.log(this.teams);
  }

  fetchTeam(){
    this.apiService.fetchAllTeams().subscribe({
      next: (response: any) => {
        this.teams = response;
        console.log(response);
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

  // tempApiArray: any = [];
  // newArray: any = [];
  // onChange(event: any){
  //   if (event.target.checked){
  //     this.tempApiArray = this.originalArrays.filter(
  //       (e: any)=> e.proficiency == event.target.value);
  //     this.teams = [];
  //     this.newArray.push(this.tempApiArray);
  //     for(let i=0; i<this.newArray.length; i++){
  //       var firstFilter = this.newArray[i];
  //       for(let i=0; i<firstFilter.length; i++){
  //         var filterObj = firstFilter[i];
  //         this.teams.push(filterObj);
  //       }
  //       console.log(this.teams);
  //     }
  //   } else {
  //     this.tempApiArray = this.teams.filter(
  //       (e: any)=> e.proficiency != event.target.value);
  //     this.newArray = [];
  //     this.teams = [];
  //     this.newArray.push(this.tempApiArray);
  //     for(let i=0; i<this.newArray.length; i++){
  //       var firstFilter = this.newArray[i];
  //       for(let i=0; i<firstFilter.length; i++){
  //         var filterObj = firstFilter[i];
  //         this.teams.push(filterObj);
  //       }
  //     }
  //   }
  // }

  // uncheckAll() {
  //   this.teams = [];
  //   this.tempApiArray = [];
  //   this.newArray = [];
  //   this.teams = this.resetTeams;
  //   this.checkboxes.forEach((element) => {
  //     // this.originalArrays = this.resetTeamMember;
  //     element.nativeElement.checked = false;
  //   });
  // }

}
