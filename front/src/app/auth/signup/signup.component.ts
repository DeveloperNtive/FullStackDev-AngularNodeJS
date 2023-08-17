import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  passwordError: string = '';

  constructor(
    private loginService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
    });
  }

  onSubmit() {
    if (
      this.registerForm.get('password')?.value !==
      this.registerForm.get('confirmPassword')?.value
    ) {
      console.log('Las contraseñas no coinciden');
      this.passwordError = 'Passwords does not match';
      this.registerForm.reset({
        fullName: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        password: '',
        confirmPassword: '',
      });
    }
    if (this.registerForm.invalid) {
      return;
    }

    if (
      this.registerForm.valid &&
      this.registerForm.get('password')?.value ===
        this.registerForm.get('confirmPassword')?.value
    ) {
      this.loginService
        .singup(
          this.registerForm.get('fullName')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value
        )
        .subscribe({
          next: (value) => {
            this.registerForm.reset();
            this.router.navigateByUrl('login');
          },
          error: (err) => {
            console.log(err.error);
            this.registerForm.reset({
              fullName: this.registerForm.get('fullName')?.value,
              email: '',
              password: '',
              confirmPassword: '',
            });
            this.passwordError = err.error;
          },
        });
    }
  }
}
