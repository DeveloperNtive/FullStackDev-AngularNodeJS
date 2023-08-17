import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  name: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.name = localStorage.getItem('name');
  }
}
