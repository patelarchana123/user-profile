import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserProfileService {
  url = 'https://dev-deskbook-userapi.1rivet.com:9504/';
  constructor(private http: HttpClient) {}

  getDesignation() {
    return this.http.get(`${this.url}api/deskbook/designations`);
  }

  getModeOfWork() {
    return this.http.get(`${this.url}api/deskbook/mode-of-works`);
  }

  getDays() {
    return this.http.get(`${this.url}api/deskbook/working-days`);
  }

  getCity() {
    return this.http.get(`${this.url}api/deskbook/cities`);
  }

  getFloor(cityId: any) {
    console.log(cityId);
    debugger
    return this.http.get(`${this.url}api/deskbook/floors/` + cityId);
  }

  getColumn(floorId: any) {
    debugger
    return this.http.get(`${this.url}api/deskbook/columns/` + floorId);
  }

  getSeat(columnId: any) {
    debugger
    return this.http.get(`${this.url}api/deskbook/seats/` + columnId);
  }
  postData(data: any) {
    console.log(data);

    return this.http.put(this.url + 'api/deskbook/user-profile/', data);
  }

  getAllData() {
    return this.http.get(this.url + 'api/deskbook/user-profile/');
  }

  //  API Integration of complete user profile view.
  getUserProfileView() {
      return this.http.get(this.url + 'api/deskbook/user-profile/');
  }
}
