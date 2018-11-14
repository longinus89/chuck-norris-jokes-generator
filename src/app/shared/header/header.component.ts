import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public title: string;

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
    this.title = 'Chuck Norris Jokes Generator';
  }

  isCounteVisible() {
    return this.sessionService.isActive();
  }

}
