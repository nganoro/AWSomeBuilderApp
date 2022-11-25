import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import {map} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css']
})
export class UploadTestComponent implements OnInit {

  toFile: any;
  fileUploadUrl: string;
  fileFetchUrl: string;
  userProfilePicName = '';
  userProfilePic: string;

  constructor(
    private uploadService: UploadService,
    private http: HttpClient,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAvatarName();
    console.log(this.userProfilePicName);
    this.fetchUrl();
    this.uploadUrl();
    // this.uploadService.fileFetch(this.userProfilePicName, this.fileFetchUrl);
  }

  submit() {
    const file = this.toFile.item(0);
    this.uploadService.uploadProfilePic(file, this.fileUploadUrl);
  }

  getProfilePic(){
    this.userProfilePic = this.fileFetchUrl;
  }

  onChange(event: Event) {
    // @ts-ignore
    this.toFile = event.target.files;
  }

  getAvatarName(){
    const user = this.authService.getAuthenticatedUser()?.getUsername();
    this.userProfilePicName = user!;
  }

  uploadUrl(){
    this.uploadService.getUploadSignedUrl(this.userProfilePicName).subscribe({
      next: (response: any) => {
        this.fileUploadUrl = response.presigned_url;
        console.log(this.fileUploadUrl);
      },
      error: error => {
        console.log(error)
      }
    });
  }

  fetchUrl(){
    this.uploadService.getFetchSignedUrl(this.userProfilePicName).subscribe({
      next: (response: any) => {
        this.fileFetchUrl = response.presigned_url;
        console.log(this.fileFetchUrl);
      },
      error: error => {
        console.log(error)
      }
    });
  }


}
