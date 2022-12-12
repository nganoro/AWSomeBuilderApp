import {Component, OnInit} from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {Router} from "@angular/router";
import {Skills} from "../../shared/skills.model";
import {Store} from "@ngrx/store";
import {
  sendingFilterResults,
  sendingUserSkill
} from "../../shared/user-state-store/user.action";
import {selectFilter} from "../../shared/user-state-store/user.selector";
import {Observable} from "rxjs";


@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.css']
})
export class ExpertSearchComponent implements OnInit {
  p: any;
  service: string;
  proficiency: string;
  chosenSkill: Skills;
  teamMember: TeamMember[] = [];
  tempTeamMember: TeamMember[] = [];
  filterResult$: Observable<TeamMember[]>

  constructor(
    private apiService: ApiService,
    private router: Router,
    private store: Store) {
      this.filterResult$ = this.store.select(selectFilter);
      this.filterResult$.subscribe({
        next: (response: any[]) => {
          // @ts-ignore
          this.teamMember = response['currentTeam'];
        },
        error: error => {
          console.log(error)
        }
      });
  }


  ngOnInit(): void {
  }

  filterList = {
    service : ['S3', 'Lambda', 'API', 'DynamoDB', 'CloudFront'],
    proficiency: ['Beginner', 'Intermediate', 'Expert']
  };

  filterChange(appliedfilters: any) {
    let SK = 'user_skills';
    this.service = appliedfilters.appliedFilterValues.service;
    this.proficiency = appliedfilters.appliedFilterValues.proficiency;
    this.chosenSkill = new Skills(this.service, this.proficiency);
    let sk = 'skill#'+this.service +'#'+this.proficiency;
    this.apiService.fetchGSISkills(sk, SK).subscribe({
      next: (response) => {
        let resultArray: any[] = [];
        response.forEach((pk:any)=>{
          resultArray.push(pk.gsi1_sk);
        });
        this.getTeamMembers(resultArray);
      },
      error: error => {
        console.log(error)
      }
    });
  }

  getTeamMembers(filterArray: any[]){
    for(let filter of filterArray){
       this.apiService.fetchSingleData(filter).subscribe({
         next: (response) => {
           this.tempTeamMember.push(response);
         },
         error: error => {
           console.log(error)
         }
       });
      this.store.dispatch(sendingFilterResults({teamMember: this.tempTeamMember}));
    }
  }

  showRow(team: TeamMember) {
    this.store.dispatch(sendingUserSkill({skill: this.chosenSkill}));
    this.router.navigate(['/experts/', team.user_name]);
  }

  resetSearch(){
    this.teamMember = [];
  }
}
