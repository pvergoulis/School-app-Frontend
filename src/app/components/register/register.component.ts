import { Component, inject } from '@angular/core';
import { NavbarBeforeLoginComponent } from '../navbar-before-login/navbar-before-login.component';
import { FooterComponent } from '../footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    NavbarBeforeLoginComponent,
    FooterComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router)

  registrationStatusSuccess: boolean = false
  registrationStatusFailed: boolean = false

  
  

  form = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    },
    this.passwordConfirmValidator
  );

  passwordConfirmValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const form = control as FormGroup;

    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {
    const newUser: User = {
      username: this.form.get('username')?.value || '',
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || '',
    };

    console.log(newUser);

    this.userService.registerUser(newUser).subscribe({
      next: (response) => {
        console.log('new user saved', response);
        this.registrationStatusSuccess = true
        setTimeout(()=>{
          this.router.navigate(['login'])
        })
        
      },
      error: (response) => {
        console.log('not saved ', response);
        this.registrationStatusFailed = true

      },
    });
  }

  check_dublicate_email() {
    const email = this.form.get('email')?.value;

    if (email) {
      this.userService.check_dublicate_email(email).subscribe({
        next: (response) => {
          console.log(response);
          this.form.get('email')?.setErrors(null);
        },
        error: (response) => {
          console.log(response);
          const message = response.data;
          console.log(message);
          this.form.get('email')?.setErrors({ dublicateEmail: true });
        },
      });
    }
  }

  check_dublicate_username(){
    const username = this.form.get('username')?.value

    if (username) {
      this.userService.check_dublicate_email(username).subscribe({
        next: (response) => {
          console.log(response);
          this.form.get('username')?.setErrors(null);
        },
        error: (response) => {
          console.log(response);
          const message = response.data;
          console.log(message);
          this.form.get('username')?.setErrors({ dublicateUsername: true });
        },
      });
    }
  }

}
