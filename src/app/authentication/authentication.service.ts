import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  private logoutEventSource$: BehaviorSubject<boolean>;
  public logoutEvent: Observable<boolean>;

  constructor(private sessionService: SessionService, private router: Router) {
    this.logoutEventSource$ = new BehaviorSubject(true);
    this.logoutEvent = this.logoutEventSource$.asObservable();
  }

  login(credentials): Observable<boolean> {
    return new Observable((observer) => {
      if (credentials) {
        this.sessionService.create(credentials.username);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  logout() {
    this.sessionService.destroy();
    this.logoutEventSource$.next(true);
    this.router.navigate(['/login']);
  }
}
