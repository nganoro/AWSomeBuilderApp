import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {UserComponent} from "./user/user/user.component";
import { TeamSearchComponent } from './teams/team-search/team-search.component';
import { ExpertSearchComponent } from './experts/expert-search/expert-search.component';
import {AuthService} from "./authorization/auth.service";
import {AuthGuardGuard} from "./authorization/auth/auth-guard.guard";
import {SignUpComponent} from "./authorization/sign-up/sign-up.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/Authorization', pathMatch: 'full'},
  { path: 'Authorization', component: AuthorizationComponent},
  { path: 'User',
    component: UserComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: '',
        component: UserDetailComponent,
      },
      { path: ':id',
        component: UserDetailComponent,
      },
      { path: ':id/edit',
        component: UserEditComponent,
      }
      ]},
  { path: 'userEdit', component: UserEditComponent,canActivate: [AuthGuardGuard]},
  { path: 'teams', component: TeamSearchComponent, canActivate: [AuthGuardGuard]},
  { path: 'experts', component: ExpertSearchComponent, canActivate: [AuthGuardGuard]},
  { path: 'signUp', component: SignUpComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthService]
})
export class AppRoutingModule { }
