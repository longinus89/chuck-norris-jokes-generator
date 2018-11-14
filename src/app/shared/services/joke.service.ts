import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SessionService } from 'src/app/session/session.service';
import { Joke } from '../../shared/models/joke.model';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  // public favoritesJokes$ = new BehaviorSubject([]);

  private favoritesJokesSource$: BehaviorSubject<Array<Joke>>;
  public favoritesJokes: Observable<Joke[]>;

  private fetchedJokesSource$: BehaviorSubject<Array<Joke>>;
  public fetchedJokes: Observable<Joke[]>;

  public favoritesJokeList: Joke[];
  private autofillTimer;

  private isFavoritesListFullSource$: BehaviorSubject<Boolean>;
  public isFavoritesListFull: Observable<Boolean>;

  private jokeApiUrl = 'http://api.icndb.com/jokes/';

  constructor(private sessionService: SessionService,
              private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.favoritesJokesSource$ = new BehaviorSubject([]);
    this.favoritesJokes = this.favoritesJokesSource$.asObservable();

    this.fetchedJokesSource$ = new BehaviorSubject([]);
    this.fetchedJokes = this.fetchedJokesSource$.asObservable();

    this.isFavoritesListFullSource$ = new BehaviorSubject(true);
    this.isFavoritesListFull = this.isFavoritesListFullSource$.asObservable();

    this.favoritesJokeList = [];
    this.loadFavoritesJokes();

    this.authenticationService.logoutEvent.subscribe(() => {
      this.clearAutofill();
    });
  }

  private clearAutofill() {
    clearInterval(this.autofillTimer);
    delete this.autofillTimer;
  }

  public loadFavoritesJokes() {
    const favoritesIds = this.sessionService.favoritesIds;
    const subscriptions = [];
    favoritesIds.forEach(jokeId => {
      subscriptions.push(this.retrieveJokeFromRemote(jokeId));
    });
    forkJoin(subscriptions).subscribe((result) => {
      const jokes = result.map((data) => {
        const jokeData = data.value;
        return new Joke(jokeData.id, jokeData.joke, jokeData.categories);
      });
      this.favoritesJokesSource$.next(jokes);
      this.favoritesJokeList = jokes;
    });
  }

  public updateRandomJokes () {
    this.http.get(this.jokeApiUrl + 'random/10').subscribe(data => {
      const jokes = (<any>data).value.map((entry) => {
        return new Joke(entry.id, entry.joke, entry.categories);
      });
      this.fetchedJokesSource$.next(jokes);
    });
  }

  private retrieveJokeFromRemote (id): Observable<any> {
    return this.http.get(this.jokeApiUrl + id);
  }

  private loadNewFavoriteJoke () {
    if (this.favoritesJokeList.length === 10) {
      this.clearAutofill();
      return;
    }

    this.http.get(this.jokeApiUrl + 'random/1').subscribe(data => {
      const jokeData = (<any>data).value[0];
      const newJoke = new Joke(jokeData.id, jokeData.joke, jokeData.categories);
      this.favoritesJokeList.push(newJoke);
      this.favoritesJokesSource$.next(this.favoritesJokeList);
      this.saveFavoritesList();
      if (this.favoritesJokeList.length === 10) {
        this.clearAutofill();
        this.informFavoritesListFull();
      }
    });
  }

  public removeFromFavorites(compareJoke: Joke) {
    this.favoritesJokeList.splice(this.favoritesJokeList.findIndex((joke) => joke.id === compareJoke.id), 1);
    this.saveFavoritesList();
  }

  public addToFavorites(newJoke: Joke) {
    const checkJoke = this.favoritesJokeList.find((entry) => entry.id === newJoke.id);
    if (checkJoke) {
      return;
    }
    this.favoritesJokeList.push(newJoke);
    this.favoritesJokesSource$.next(this.favoritesJokeList);
    this.saveFavoritesList();
    if (this.favoritesJokeList.length === 10) {
      this.informFavoritesListFull();
    }
  }

  public informFavoritesListFull() {
    this.isFavoritesListFullSource$.next(true);
  }

  public manageAutoFill(autofillEnabled) {
    if (autofillEnabled) {
      this.autofillTimer = setInterval(this.loadNewFavoriteJoke.bind(this), 5000);
    } else {
      this.clearAutofill();
    }
  }

  private saveFavoritesList () {
    this.sessionService.favoritesIds = this.favoritesJokeList.map(joke => joke.id);
  }
}
