import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class PostHeaderComponent {
  @Input()
  titleHeader: string = '';
}
