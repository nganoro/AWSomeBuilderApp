import {Component, OnInit} from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {ApiService} from "../../authorization/api.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.css']
})
export class ExpertSearchComponent implements OnInit {
  teamMember: TeamMember[] = [];
  p: any;
  service: string;
  proficiency: string;

  constructor(
    private apiService: ApiService,
    private router: Router,) { }

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
           this.teamMember.push(response);
         },
         error: error => {
           console.log(error)
         }
       });
    }
  }

  showRow(team: TeamMember) {
    this.router.navigate(['/experts/', team.user_name]);
  }

  resetSearch(){
    this.teamMember = [];
  }
}
