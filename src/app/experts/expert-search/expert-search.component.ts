import { Component, OnInit } from '@angular/core';
import {TeamMember} from "../../shared/TeamMember";
import {AuthService} from "../../authorization/auth.service";
import {ApiService} from "../../authorization/api.service";

@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.css']
})
export class ExpertSearchComponent implements OnInit {

  public teamMember: TeamMember[] = [];
  searchText: any;

  constructor(
    private apiService: ApiService,) { }

  ngOnInit(): void {
    this.retrieveData();
    console.log(this.teamMember);
  }

  originalArrays: any = [];
  retrieveData(){
    this.apiService.fetchAllData().subscribe({
        next: (response) => {
            this.teamMember = response; // if api is chosen, get what origianlArray gives
            this.originalArrays = response;// if api is chosen, remove everything else but keep api, then pass it to teamMember
            console.log(this.originalArrays);
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

  resetFilter(){
    this.teamMember = this.originalArrays;
  }
}
