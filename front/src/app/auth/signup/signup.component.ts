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

  constructor(
    private loginService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
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
      },
      { validators: this.passwordMatchValidator }
    );
  }
  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loginService
      .singup(
        this.registerForm.get('fullName')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value
      )
      .subscribe({
        next: (value) => {
          this.router.navigateByUrl('login');
        },
        error: (err) => {},
      });
    console.log(this.registerForm.value);

    this.registerForm.reset();
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
