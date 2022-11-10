import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {UserComponent} from "./user/user/user.component";
import { TeamSearchComponent } from './teams/team-search/team-search.component';
import { ExpertSearchComponent } from './experts/expert-search/expert-search.component';
import {AuthService} from "./authorization/auth.service";
import {AuthGuardGuard} from "./authorization/auth/auth-guard.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/Authorization', pathMatch: 'full'},
  { path: 'Authorization', component: AuthorizationComponent},
  { path: 'User', component: UserComponent,canActivate: [AuthGuardGuard]},
  { path: 'teams', component: TeamSearchComponent},
  { path: 'experts', component: ExpertSearchComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthService]
})
export class AppRoutingModule { }
