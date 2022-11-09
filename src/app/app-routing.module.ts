import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {UserComponent} from "./user/user/user.component";
import { TeamSearchComponent } from './teams/team-search/team-search.component';
import { ExpertSearchComponent } from './experts/expert-search/expert-search.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/header', pathMatch: 'full'},
  { path: 'Authorization', component: AuthorizationComponent},
  { path: 'User', component: UserComponent},
  { path: 'teams', component: TeamSearchComponent},
  { path: 'experts', component: ExpertSearchComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
