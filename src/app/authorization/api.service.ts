import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService} from "./auth.service";
import {TeamMember} from "../shared/TeamMember";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onStoreData(memeber: TeamMember) {
    console.log(memeber);

    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();


    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);

    console.log(headers.get('Content-Type'));
    console.log(headers.get('Authorization'));
    console.log(token);


    return this.http.post(
      'https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/hello',
      JSON.stringify(memeber),
      {headers: headers}).subscribe(
        response =>{
          console.log(response)
        },
        error => {
          console.log(error);
        }
      );
  }
}
