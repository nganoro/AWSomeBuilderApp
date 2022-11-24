import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {AuthService} from "../authorization/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public presigendUrl= '';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit(){
  }

  fileUpload(file: any, url: string) {
    console.log(file);

    const contentType = file.type;

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', contentType);

    console.log(url);

    return this.http.put(
      url,
      file,
      {headers: headers})
      .subscribe({
        next: response => {console.log(response)},
        error: error => {console.log(error)}
      });
  }

  getUploadSignedUrl(){
    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    // let params = new HttpParams().set('key', profileName);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/presignedURL',
      {
        headers: headers
        // params: params
      });
  }


}
