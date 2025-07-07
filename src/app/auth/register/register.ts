import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Header } from '../../shared/header/header';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserRegisterDTO } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatButton,
    Header,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = signal('');

  registerForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
    dateOfBirth: new FormControl<string>('', [Validators.required]),
  });

  onSubmit() {
    const user: UserRegisterDTO = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!,
      email: this.registerForm.value.email!,
      phoneNumber: this.registerForm.value.phoneNumber!,
      address: this.registerForm.value.address!,
      dateOfBirth: this.registerForm.value.dateOfBirth!,
    };

    this.authService.register(user).subscribe({
      next: (resp) => {
        this.errorMessage.set(resp);
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (error) => {
        this.errorMessage.set(error.error);

        setTimeout(() => {
          this.errorMessage.set('');
        }, 3000);
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
