import { Component, ComponentRef, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from '@angular/cdk/portal';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService,
    private overlay: Overlay,) { }

  ngOnInit(): void {
  }

  public openOverlay(): void {
    let componentRef: ComponentRef<UserProfileComponent>;
    let overlayRef: OverlayRef;

    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = 'dark-backdrop';
    // create overlay reference
    overlayRef = this.overlay.create(overlayConfig);
    const portal: ComponentPortal<UserProfileComponent>
      = new ComponentPortal<UserProfileComponent>(UserProfileComponent);
    // attach overlay with portal
    componentRef = overlayRef.attach(portal);
    componentRef.instance.data = 'test';
    componentRef.instance.cancelPopup.subscribe((data:boolean) => {
    
      console.log('data : ',data);
      overlayRef.detach();
    });
 
  }


  // logout button
  public logout() {
    this._authService.logout();
  }
}
