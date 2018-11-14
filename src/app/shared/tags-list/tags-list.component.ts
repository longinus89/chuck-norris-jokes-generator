import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent {

  @Input() public tags: String[];

  constructor() {
  }

}
