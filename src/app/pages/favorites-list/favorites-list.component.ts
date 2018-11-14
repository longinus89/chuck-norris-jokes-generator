import { Component } from '@angular/core';
import { JokeService } from 'src/app/shared/services/joke.service';
import { Joke } from 'src/app/shared/models/joke.model';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {

  public emptyListMessage: string;
  public favoritesList: Joke[];
  constructor(public jokeService: JokeService) {
    this.emptyListMessage = 'The favorites joke list is empty';
    this.jokeService.favoritesJokes.subscribe(data => {
      this.favoritesList = data;
    });
  }
}
