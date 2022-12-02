import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';
import {CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { User } from '../user/user.model';
import {TeamMember} from "../shared/TeamMember";
import {ApiService} from "./api.service";


var poolData = {
  UserPoolId: environment.cognitoUserPoolId,
  ClientId: environment.cognitoAppClientId
};

var userPool = new CognitoUserPool(poolData);

@Injectable({providedIn: 'root'})
export class AuthService {

  unique_Username = '';

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
      this.router.navigate(['/Confirmation']);
      this.uniqueUsername(user.username);
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
        window.location.reload();
        that.router.navigate(["/Authorization"]);
       },
    });

  }

  signOut(){
    this.getAuthenticatedUser()?.signOut();
    window.location.reload();
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
    });
  }

  getAuthenticatedUser(){
    return userPool.getCurrentUser();
  }

  getUserSession(){
    let userSession : any;
    const currentUser = userPool.getCurrentUser();

    if(currentUser != null){
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        userSession = session;
      })
    }
    return userSession;
  }

  isLoggedIn(){
    var isAuthenticated = false;

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser != null){
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuthenticated = session.isValid();
      })
    }

    return isAuthenticated;
  }

  uniqueUsername(user_name: string){
    this.unique_Username = user_name + '_' + Math.random() + '';
  }

  getUniqueUsername(){
    return this.unique_Username;
  }

}
