import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './header/header/header.component';
import { UserComponent } from './user/user/user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TeamSearchComponent } from './teams/team-search/team-search.component';
import { ExpertSearchComponent } from './experts/expert-search/expert-search.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HeaderComponent,
    UserComponent,
    LoadingSpinnerComponent,
    TeamSearchComponent,
    ExpertSearchComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
