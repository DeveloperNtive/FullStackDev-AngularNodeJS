import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
})
export class NewpostComponent implements OnInit {
  message!: FormGroup;
  fecha: string = `${this.hourFormatter()} ${this.getDayNow()}`;
  ngOnInit(): void {
    this.message = new FormGroup({
      title: new FormControl('', [Validators.maxLength(30)]),
      messages: new FormControl('', [Validators.maxLength(300)]),
    });
  }

  getDayNow() {
    const fecha = new Date();
    const day =
      fecha.getDate().toString().split('').length < 2
        ? `0${fecha.getDate().toString()}`
        : fecha.getDate().toString();
    const month =
      (fecha.getMonth() + 1).toString().split('').length < 2
        ? `0${fecha.getMonth().toString()}`
        : fecha.getMonth().toString();
    const year = fecha.getFullYear();
    return `${day}/${month}/${year}`; //dd/mm/aaaa
  }
  hourFormatter(): string {
    const fecha = new Date();
    const hour =
      fecha.getHours() < 12
        ? fecha.getHours()
        : (fecha.getHours() - 12).toString().split('').length < 2
        ? `0${fecha.getHours() - 12}`
        : fecha.getHours() - 12;
    const mins =
      fecha.getMinutes().toString().split('').length < 2
        ? `0${fecha.getMinutes()}`
        : fecha.getMinutes();
    return `${hour}:${mins} ${fecha.getHours() > 12 ? 'PM' : 'AM'}`;
  }
}
