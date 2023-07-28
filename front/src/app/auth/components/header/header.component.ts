import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  @Input() witdh: string = '';
  @Input() height: string = '';
  @Input() marginTop: string = '';
  @ViewChild('HeaderImg')
  HeaderImg!: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    this.HeaderImg.nativeElement.style.width = this.witdh;
    this.HeaderImg.nativeElement.style.height = this.height;
    this.HeaderImg.nativeElement.style.marginTop = this.marginTop;
  }
}
