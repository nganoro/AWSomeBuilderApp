import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpParamsOptions} from "@angular/common/http";
import { AuthService} from "./auth.service";
import {TeamMember} from "../shared/TeamMember";
import {map, Observable, tap} from "rxjs";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public teamMember: TeamMember[] = [];
  public singleTeamMember: TeamMember;

  getTeam(){
    console.log(this.teamMember);
    return this.teamMember;
  }

  onStoreData(member: TeamMember) {

    console.log(member);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    return this.http.post(
      'https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/hello',
      JSON.stringify(member),
      {headers: headers}).subscribe({
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

    fetchSingleData(){

      const currUser = this.authService.getAuthenticatedUser();
      let memberId: string = currUser?.getUsername()! || '';
      console.log(memberId);

      let params = new HttpParams().set('User_Id', memberId);

      const userSession = this.authService.getUserSession();
      const token = userSession.getIdToken().getJwtToken();

      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', token);

      return this.http.get<TeamMember>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/experts',
        {
          headers: headers,
          params: params,
        })
        .pipe(
          map((result) => {
            this.singleTeamMember = result;
            return this.singleTeamMember;
          })
        );
    }

  userNameExtenstion(){
    const userSession = this.authService.getAuthenticatedUser();
    // return this.officialUsesssrName = this.profileForm.value.firstName + '_' + userSession?.getUsername();
  }
}

