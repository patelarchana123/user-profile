import { Component, OnInit } from '@angular/core';
import { ProfileStandardClaims } from 'oidc-client';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  /** Data of logged in user */
  public loggedInUserData!: ProfileStandardClaims;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getUserData().subscribe((res) => {
      this.loggedInUserData = res;
    })
  }

}
