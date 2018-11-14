import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { NoAuthGuardService } from './no-auth-guard/no-auth-guard.service';
import { SessionService } from '../session/session.service';
import { AuthenticationService } from '../authentication/authentication.service';

import { LoginModalComponent } from '../shared/login/loginModal.component';
import { AppChildrenRoutes } from './app-children-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../pages/pages.module';
import { HeaderComponent } from '../shared/header/header.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: AppChildrenRoutes
  },
  {
    path: '',
    component: HeaderComponent,
    outlet: 'header'
  },
  {
    path: 'login',
    canActivate: [NoAuthGuardService],
    component: LoginModalComponent
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    PagesModule
  ],
  providers: [
    AuthGuardService,
    NoAuthGuardService,
    SessionService,
    AuthenticationService
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
