import { DatePipe, LowerCasePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostService } from '../service/post.service';
import { IPosts } from '../interface/myPost.interface';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css'],
})
export class MypostComponent implements OnInit {
  nPosts: number = 0;
  nPaginas: number = 0;
  pagination: number = 0;
  page: number = 1;
  posts: IPosts[] = [];
  postsViews: IPosts[] = [];
  @ViewChild('dateInput')
  dateInput!: ElementRef<HTMLInputElement>;
  date = new FormControl('');
  pipe = new DatePipe('en-US');
  myFormattedDate = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    console.log(this.myFormattedDate!);
    this.postService.myPost(1, this.myFormattedDate!).subscribe({
      next: (value) => {
        localStorage.setItem('token', value.token);
        this.postsViews = value.posts.data;
        this.nPaginas = value.posts.data.length;
        this.nPosts = value.totalPosts
        console.log(value.totalPosts);
      },
      error: (err) => {},
    });
    this.date.setValue('');
  }

  filterPostsByDate() {
    const InputValue = this.dateInput.nativeElement.value
      .split('-')
      .reverse()
      .join('/');
    this.postService.myPost(1, InputValue).subscribe({
      next: (value) => {
        localStorage.setItem('token', value.token);
        this.postsViews = value.posts.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  previous() {
    if (this.pagination >= 1) {
      this.pagination--;
      this.page--;
    }
  }

  showPosts(currentPage: number) {
    const InputValue = this.dateInput.nativeElement.value
      .split('-')
      .reverse()
      .join('/');
    console.log('InputValue', InputValue);
    console.log(this.myFormattedDate);
    const currentDate = InputValue || this.myFormattedDate!;

    this.postService.myPost(currentPage, currentDate).subscribe({
      next: (value) => {
        localStorage.setItem('token', value.token);
        this.postsViews = value.posts.data;
      },
      error: (err) => {},
    });
  }

  next() {
    if (this.pagination >= this.nPaginas) {
      this.pagination++;
      this.page++;
    }
  }
}
