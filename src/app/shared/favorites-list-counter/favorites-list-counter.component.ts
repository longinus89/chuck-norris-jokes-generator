import { Component } from '@angular/core';
import { JokeService } from 'src/app/shared/services/joke.service';

@Component({
  selector: 'app-favorites-list-counter',
  templateUrl: './favorites-list-counter.component.html',
  styleUrls: ['./favorites-list-counter.component.scss']
})
export class FavoritesListCounterComponent {

  constructor(public jokeService: JokeService) {
  }

}
