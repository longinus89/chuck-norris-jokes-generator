import { Component } from '@angular/core';
import { Joke } from 'src/app/shared/models/joke.model';
import { JokeService } from 'src/app/shared/services/joke.service';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent {
  public jokesList: Joke[];

  constructor(public jokeService: JokeService) {
    this.jokeService.fetchedJokes.subscribe(data => {
      this.jokesList = data;
    });

    if (!this.jokesList.length) {
      this.jokeService.updateRandomJokes();
    }
  }

  public isJokeInFavorites (joke) {
    return this.jokeService.favoritesJokeList.some((favoriteJoke) => {
      return favoriteJoke.id === joke.id;
    });
  }

  public isFavoritesListFull () {
    return this.jokeService.favoritesJokeList.length === 10;
  }

  public addJokeToFavorites (joke) {
    this.jokeService.addToFavorites(joke);
  }
}
