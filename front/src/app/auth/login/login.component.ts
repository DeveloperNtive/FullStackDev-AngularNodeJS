import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';
  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.required,
      ]),
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: (value) => {
          localStorage.setItem('token', value.token);
          localStorage.setItem('name', value.name);
          this.router.navigateByUrl('/post/create-post');
          this.authService.name = value.name;
        },
        error: (err) => {
          this.error = 'Invalid Email or Password';
        },
      });

    // Reinicia el formulario
    this.loginForm.reset();
  }
}
