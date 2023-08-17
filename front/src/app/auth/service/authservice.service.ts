import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interface/loginresponse.interface';
import { ErrorResponse } from '../interface/errorresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  baseUrl: string = 'http://localhost:3000';
  name!: string;
  constructor(private httpClient: HttpClient) {}

  singup(fullName: string, email: string, passWord: string) {
    return this.httpClient.post<LoginResponse | ErrorResponse>(
      `${this.baseUrl}/user/signUp`,
      {
        fullName,
        email,
        passWord,
      }
    );
  }
  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/user/login`, {
      email,
      password,
    });
  }
}
