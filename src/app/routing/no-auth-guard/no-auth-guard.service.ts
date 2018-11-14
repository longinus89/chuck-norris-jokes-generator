import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../session/session.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {
  constructor(private router: Router,
              private sessionService: SessionService) {
  }

  canActivate(_ign_route: ActivatedRouteSnapshot): Observable<boolean> {
    this.sessionService.load();
    return new Observable((observer) => {
      const isActive = this.sessionService.isActive();
      if (isActive) {
        this.redirectToRoot();
        observer.next(false);
        observer.complete();
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }

  redirectToRoot () {
    this.router.navigate(['/jokes']);
  }
}
