import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
})
export class NewpostComponent implements OnInit {
  img: string = '';
  succes: string = '';
  error = '';
  name!: any;
  message!: FormGroup;
  fecha: string = `${this.hourFormatter()} ${this.getDayNow()}`;
  @ViewChild('modalButton')
  modalButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.name = localStorage.getItem('name')
  }

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

  sharePost() {
    if (
      this.message.get('title')?.value.trim() !== '' &&
      this.message.get('messages')?.value.trim() !== ''
    ) {
      this.postService
        .newPost({
          tittle: this.message.get('title')?.value,
          message: this.message.get('messages')?.value,
        })
        .subscribe({
          next: (response) => {
            this.error = '';
            this.message.reset({ title: '', messages: '' });
            this.modalButton.nativeElement.click();
            this.img = '../../../assets/images/postCreatedImg.png';
            this.succes = "Post Created"
          },
          error: (err) => {
            console.log(err);
            this.img = '../../../assets/images/somethingWentWrong.png';
            this.succes = "Post Created"
          },
        });
    } else {
      this.error = 'Please create a valid post';
    }
  }
}
