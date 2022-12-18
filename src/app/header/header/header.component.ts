import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signInSubject.subscribe(
      response => {
        this.isSignedIn = response;
      }
    );
    if(this.authService.getAuthenticatedUser()){
      this.isSignedIn = true;
    }
  }

  onHome(){
    const authenticatedUser = this.authService.getAuthenticatedUser();
    if(authenticatedUser){
      this.router.navigate(['/User/', authenticatedUser.getUsername()]);
    } else {
      this.router.navigate(['Authorization']);
    }
  }

  onNavigateHome(){
    const authenticatedUser = this.authService.getAuthenticatedUser();
    this.router.navigate(['/User/', authenticatedUser!.getUsername()]);
  }

  onLogout(){
    this.authService.signOut();
  }

}
