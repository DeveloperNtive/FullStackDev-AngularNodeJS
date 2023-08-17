import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  databsdismiss: string = '';
  @Input()
  text: string = '';
  @Input()
  class: string = '';
  @Input()
  divClass: string = '';
}
