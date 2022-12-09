import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpParamsOptions} from "@angular/common/http";
import { AuthService} from "./auth.service";
import { TeamMember } from "../shared/TeamMember";
import {map, Observable, tap} from "rxjs";
import {Teams} from "../shared/Teams";
import {ProfileModel} from "../shared/profile.model";
import {Skills} from "../shared/skills.model";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public teamMember: TeamMember[] = [];
  singleTeamMember: TeamMember;
  singleTeam: Teams;

  onStoreData(member: TeamMember) {

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.post(
      'https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/hello',
      JSON.stringify(member),
      {headers: headers})
      .subscribe({
            next: response => {console.log(response)},
            error: error => {console.log(error)}
      });
  }


  fetchAllData():Observable<TeamMember[]> {

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/experts',
      {headers: headers})
      .pipe(
        map((result) => {
            let resultArray: any[] = [];
            result.Items.forEach((item:any)=>{
              resultArray.push(item);
            });
            this.teamMember = resultArray;
            return resultArray;
          })
      );
    }

  fetchSingleData(memberId: string){

    let params = new HttpParams().set('PK', memberId);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/experts',
      {
        headers: headers,
        params: params,
      })
      .pipe(
        map((result) => {
          result.Items.forEach((item:any)=>{
            this.singleTeamMember = item;
          });
          return this.singleTeamMember;
        })
      );
  }

  updateTeamMember(member: TeamMember, pk: string, sk: string){

    let params = new HttpParams()
      .set('PK', pk)
      .set('SK', sk);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.put(
      'https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/update',
      JSON.stringify(member),
      {
        headers: headers,
        params: params,
      })
      .subscribe({
        next: response => {console.log(response)},
        error: error => {console.log(error)}
      });
  }

  getUserName(){
    const currUser = this.authService.getAuthenticatedUser();
    let memberId: string = currUser?.getUsername()! || '';
    return memberId;
  }

  getUserEmail(){
    const userEmail = this.authService.getUserSession().getIdToken();
    return userEmail.payload.email;
  }

  fetchSingleTeam(team: string){

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    let params = new HttpParams().set('PK', team);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/teams',
      {
        headers: headers,
        params: params,
      })
      .pipe(
        map((result) => {
          result.Items.forEach((item: any) => {
            this.singleTeam = item;
          });
          return this.singleTeam;
        })
      );
    }

  fetchAllTeams(){
    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/teams',
      {
        headers: headers,
      })
      .pipe(
      map((result) => {
        let resultArray: any[] = [];
        result.Items.forEach((item:any)=>{
          resultArray.push(item);
        });
        return resultArray;
      })
    );
  }

  fetchTeamUsernames(team: string){

    let params = new HttpParams().set('team', team);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/TeamMember',
      {
        headers: headers,
        params: params
      }).pipe(
        map((result) => {
          let resultArray: any[] = [];
          result.Items.forEach((item:any)=>{
            resultArray.push(item);
          });
          return resultArray;
        })
      );
  }

  storeSkills(profile: ProfileModel){
    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.post(
      'https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/Profile',
      JSON.stringify(profile),
      {headers: headers})
      .subscribe({
        next: response => {console.log(response)},
        error: error => {console.log(error)}
      });
  }

  fetchSkills(user: string, key: string){

    let params = new HttpParams().set(key, user);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/Profile',
      {
        headers: headers,
        params: params
      }).pipe(
      map((result) => {
        let resultArray: any[] = [];
        result.Items.forEach((item:any)=>{
          resultArray.push(item);
        });
        return resultArray;
      })
    );

  }

  fetchGSISkills(user: string, key: string){

    let params = new HttpParams().set(key, user);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/Profile',
      {
        headers: headers,
        params: params
      }).pipe(
      map((result) => {
        let resultArray: any[] = [];
        result.Items.forEach((item:any)=>{
          resultArray.push(item);
        });
        return resultArray;
      })
    );

  }

  updateSkills(profile: ProfileModel, user: string, sk: string){
    let params = new HttpParams()
      .set('PK', user)
      .set('SK', sk);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.put(
      'https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/Profile',
      JSON.stringify(profile),
      {
        headers: headers,
        params: params,
      })
      .subscribe({
        next: response => {console.log(response)},
        error: error => {console.log(error)}
      });
  }


}

