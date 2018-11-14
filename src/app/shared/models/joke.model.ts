export class Joke {
  id: number;
  joke: String;
  categories: String[];

  constructor(id, joke, categories) {
    this.id = id;
    this.joke = joke;
    this.categories = categories;
  }
}
