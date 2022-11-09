import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';
import {CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { User } from '../user/user.model';


var poolData = {
  UserPoolId: environment.cognitoUserPoolId,
  ClientId: environment.cognitoAppClientId
};

var userPool = new CognitoUserPool(poolData);

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  signUp(username: string, email: string, password: string) {
    const user: User = {
      username: username,
      email: email,
      password: password
    };
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };
    const attributeList: CognitoUserAttribute[] = [];
    attributeList.push(new CognitoUserAttribute(emailAttribute));

    userPool.signUp(user.username, user.password, attributeList, [], (
      err,
      result
    ) => {
      // this.isLoading = false;
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      this.router.navigate(['/User']);
    });
  }

  signIn(username: string, password: string) {

    var authenticationData = {
      Username: username,
      Password: password,
    };

    var authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {Username: username, Pool: userPool};
    var cognitoUser = new CognitoUser(userData);
    const that = this;

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
          // var accessToken = result.getAccessToken().getJwtToken();
          // var idToken = result.getIdToken().getJwtToken();
          console.log(result);
          that.router.navigate(["/User"]);
        },
      onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
        },
    });
  }

  signOut(){
    let cognitoUser = userPool.getCurrentUser();
  }

  confirmUser(username: string, code: string) {
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitUser = new CognitoUser(userData);
    cognitUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        return;
      }
      this.router.navigate(['/User']);
    });
  }
}
