import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {AuthService} from "../../authorization/auth.service";
import {ApiService} from "../../authorization/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.css']
})
export class ExpertSearchComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  teamMember: TeamMember[] = [];
  resetTeamMember: TeamMember[] = [];
  searchText: any;

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  originalArrays: any = [];
  retrieveData(){
    this.apiService.fetchAllData().subscribe({
        next: (response) => {
          console.log(response);
          this.teamMember = response; // if api is chosen, get what origianlArray gives
        },
        error: error => {
          console.log(error)
        }
      });
  }

  tempApiArray: any = [];
  newArray: any = [];
  onChange(event: any){
    if (event.target.checked){
      this.tempApiArray = this.originalArrays.filter(
        (e: any)=> e.proficiency == event.target.value);
          this.teamMember = [];
          this.newArray.push(this.tempApiArray);
          for(let i=0; i<this.newArray.length; i++){
            var firstFilter = this.newArray[i];
            for(let i=0; i<firstFilter.length; i++){
              var filterObj = firstFilter[i];
              this.teamMember.push(filterObj);
            }
            console.log(this.teamMember);
          }
    } else {
      this.tempApiArray = this.teamMember.filter(
        (e: any)=> e.proficiency != event.target.value);
      this.newArray = [];
      this.teamMember = [];
      this.newArray.push(this.tempApiArray);
      for(let i=0; i<this.newArray.length; i++){
        var firstFilter = this.newArray[i];
        for(let i=0; i<firstFilter.length; i++){
          var filterObj = firstFilter[i];
          this.teamMember.push(filterObj);
        }
      }
    }
  }

  uncheckAll() {
    this.teamMember = [];
    this.tempApiArray = [];
    this.newArray = [];
    this.teamMember = this.resetTeamMember;
    this.checkboxes.forEach((element) => {
      // this.originalArrays = this.resetTeamMember;
      element.nativeElement.checked = false;
    });
  }

  showRow(team: TeamMember) {
    this.router.navigate(['/experts/', team.user_name]);
  }
}
