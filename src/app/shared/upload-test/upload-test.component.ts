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
  userProfileName = '';

  constructor(
    private uploadService: UploadService,
    private http: HttpClient,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAvatarName()
    this.uploadUrl();
  }

  submit() {
    const file = this.toFile.item(0);
    this.uploadService.fileUpload(file, this.fileUploadUrl);
  }

  onChange(event: Event) {
    // @ts-ignore
    this.toFile = event.target.files;
  }

  getAvatarName(){
    const user = this.authService.getAuthenticatedUser()?.getUsername();
    this.userProfileName = user!;
  }

  getProfilePic(fileName: string){

    let params = new HttpParams().set('key', fileName);

    return this.http.get<any>(this.fileUploadUrl,
      {
        params: params
      })
      .pipe(
        map((result) => {
          result.Items.forEach((item:any)=>{
            console.log(item);
          });
        })
      );
  }

  uploadUrl(){
    this.uploadService.getUploadSignedUrl().subscribe({
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

  }


}
