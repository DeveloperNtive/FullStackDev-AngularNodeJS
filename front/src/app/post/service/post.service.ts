import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewPost } from '../interface/newPost.interface';
import { IMyPostsResponse } from '../interface/myPost.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private URL_BASE: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}

  newPost(post: NewPost) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.httpClient.post(`${this.URL_BASE}post/newpost`, post, {
      headers,
      // responseType: 'text',
    });
  }

  myPost(pagination: number, date: string) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.httpClient.get<IMyPostsResponse>(
      `${this.URL_BASE}post/myposts/${pagination}`,
      {
        headers,
        params: { date },
        // responseType: 'text',
      }
    );
  }
}
