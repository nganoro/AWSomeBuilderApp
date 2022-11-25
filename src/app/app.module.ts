import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './header/header/header.component';
import { UserComponent } from './user/user/user.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TeamSearchComponent } from './teams/team-search/team-search.component';
import { ExpertSearchComponent } from './experts/expert-search/expert-search.component';
import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import {AuthService} from "./authorization/auth.service";
import {ApiService} from "./authorization/api.service";
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserStartComponent } from './user/user-start/user-start.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UploadTestComponent } from './shared/upload-test/upload-test.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HeaderComponent,
    UserComponent,
    LoadingSpinnerComponent,
    TeamSearchComponent,
    ExpertSearchComponent,
    SignUpComponent,
    UserEditComponent,
    UserDetailComponent,
    UserStartComponent,
    UserUpdateComponent,
    UploadTestComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        Ng2SearchPipeModule,
    ],
  providers: [
    AuthService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
