import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onHome(){
    const authenticatedUser = this.authService.getAuthenticatedUser();
    if(authenticatedUser){
      this.router.navigate(['/User']);
    } else {
      this.router.navigate(['Authorization']);
    }
  }

  onLogout(){
    this.authService.signOut();
  }

}
