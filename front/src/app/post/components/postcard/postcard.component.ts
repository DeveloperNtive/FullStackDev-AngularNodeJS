import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css']
})
export class PostcardComponent {
@Input()
textHeader: string = ""
@Input()
textBody: string = ""
@Input()
textFecha: string = ""
@Input()
textName: string = ""
@Input()
cardClass: string = ""
}
