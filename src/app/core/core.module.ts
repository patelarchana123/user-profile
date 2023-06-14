import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { AuthGuard } from './services/guard/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/interceptor/auth/auth.interceptor';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { MasterComponent } from './components/master/master.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  declarations: [
    HeaderComponent,
    AuthCallbackComponent,
    MasterComponent,
    UserProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    OverlayModule,
    PortalModule,
    ToastrModule.forRoot(),
    SharedModule,
    NgSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserProfileService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
