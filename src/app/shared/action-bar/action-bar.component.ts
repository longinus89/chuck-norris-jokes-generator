import { Component } from '@angular/core';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {

  public autofillEnabled;

  constructor(private jokeService: JokeService) {
    this.autofillEnabled = false;
    this.jokeService.isFavoritesListFull.subscribe(() => {
      this.autofillEnabled = false;
    });

  }

  public loadNewJokes () {
    this.jokeService.updateRandomJokes();
  }

  public toggleAutofill () {
    this.autofillEnabled = !this.autofillEnabled;
    this.jokeService.manageAutoFill(this.autofillEnabled);
  }

  public isFavoritesListFull () {
    return this.jokeService.favoritesJokeList.length === 10;
  }
}
