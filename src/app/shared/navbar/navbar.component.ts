import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
  }

  isFavoritesDisabled() {
    return this.jokeService.favoritesJokeList.length === 0;
  }

}
