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
import {UserStartComponent} from "./user/user-start/user-start.component";
import {UserUpdateComponent} from "./user/user-update/user-update.component";
import {UploadTestComponent} from "./shared/upload-test/upload-test.component";
import {TeamsDetailComponent} from "./teams/teams-detail/teams-detail.component";
import {TeamStartComponent} from "./teams/team-start/team-start.component";
import {ExpertDetailComponent} from "./experts/expert-detail/expert-detail.component";
import {ConfirmationPageComponent} from "./authorization/confirmation-page/confirmation-page.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/Authorization', pathMatch: 'full'},
  { path: 'Authorization', component: AuthorizationComponent},
  { path: 'User',
    component: UserComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: '',
        component: UserStartComponent,
      },
      { path: 'signup',
        component: UserEditComponent,
      },
      { path: ':id',
        component: UserDetailComponent,
      },
      { path: ':id/edit',
        component: UserUpdateComponent,
      }
      ]},
  { path: 'Confirmation', component: ConfirmationPageComponent},
  { path: 'userEdit', component: UserEditComponent,canActivate: [AuthGuardGuard]},
  { path: 'teams',
    component: TeamSearchComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: '',
        component: TeamStartComponent,
      }
    ]},
  { path: 'teams/:id', component: TeamsDetailComponent, canActivate: [AuthGuardGuard]},
  { path: 'experts', component: ExpertSearchComponent, canActivate: [AuthGuardGuard]},
  { path: 'experts/:id', component: ExpertDetailComponent, canActivate: [AuthGuardGuard]},
  { path: 'signUp', component: SignUpComponent},
  { path: 'upload', component: UploadTestComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthService]
})
export class AppRoutingModule { }
