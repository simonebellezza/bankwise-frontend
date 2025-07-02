import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLoginDTO } from '../../models/user.model';
import { Header } from "../../shared/header/header";

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    Header
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage = signal('');

  onSubmit() {
    const credential: UserLoginDTO = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(credential).subscribe({
      next: (resp) => {
        this.errorMessage.set('');
        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.error.message);
        setTimeout(() => {
          this.errorMessage.set('');
        }, 2000);
        this.loginForm.reset();
      },
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
