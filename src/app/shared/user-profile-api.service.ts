import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileApiService {
  private url:string = environment.java_url;
  
  constructor(
    private _http :HttpClient
  ) { }

  getCity(){
    return this._http.get(`${this.url}api/deskbook/cities`);
  }
  getFloor(){
    return this._http.get(`${this.url}/api/deskbook/floors/{cityId}`);
  }
}
