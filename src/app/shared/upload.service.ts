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

  getProfilePic(url: string){
    // let params = new HttpParams().set('key', fileName);

    return this.http.get<any>(url)
      .pipe(
        map((result) => {
          result.Items.forEach((item:any)=>{
            console.log(item);
          });
        })
      );
  }

  uploadProfilePic(file: any, url: string) {
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

  fileFetch(file: any, url: string) {
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

  getUploadSignedUrl(fileName: string){
    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let params = new HttpParams().set('fileName', fileName);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/hello/post',
      {
        headers: headers,
        params: params
      });
  }

  //dynamically pass the name of the file you want to retrieve
  getFetchSignedUrl(fileName: string){
    const userSession = this.authService.getUserSession();
    const token = userSession.getIdToken().getJwtToken();

    let params = new HttpParams().set('fileName', fileName);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);

    return this.http.get<any>('https://jwqaleasy0.execute-api.us-east-1.amazonaws.com/prod/hello/get',
      {
        headers: headers,
        params: params
      });
  }


}
