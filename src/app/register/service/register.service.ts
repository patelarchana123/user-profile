import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/register.model';

@Injectable()
export class RegisterService {
  //register url
private url:string = environment.apiUrl;
  constructor(private _http :HttpClient) { 

  }
// send register data
  userRegister(data:User){
    const body = {
      firstName:data.firstName,
      lastName:data.lastName,
      emailId:data.email,
      password:data.password
    }
    return this._http.post(`${this.url}/users`,body);
  }

}
