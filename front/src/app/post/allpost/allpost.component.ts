import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.css'],
})
export class AllpostComponent implements OnInit {
  @ViewChild('inputSearch')
  searchWord!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDate')
  date!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {
  }

  searchWordInput() {
    console.log(this.searchWord.nativeElement.value);
  }
  
  dateInput() {
    console.log(this.date.nativeElement.value);
  }
}
