import { Component, inject } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { FooterComponent } from "../footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import {jwtDecode} from 'jwt-decode'
import { Credentials,LoggedInUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-login',
  imports: [NavbarBeforeLoginComponent, FooterComponent, MatButtonModule, MatInputModule,MatFormFieldModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userService= inject(UserService)
  router = inject(Router)
  successLogin = false

 
  form = new FormGroup({
    username: new FormControl('', Validators.required,),
    password : new FormControl('', Validators.required)
  })

  onSubmit(){
    
    const credentials = this.form.value as Credentials

    this.userService.loginUser(credentials)
      .subscribe({
        next: (response)=>{
          console.log('Logged in',response)
          const access_token = response.data
          localStorage.setItem('access_token', access_token)

          const decodedTokenSubject = jwtDecode(access_token) as unknown as LoggedInUser
          console.log(decodedTokenSubject)

          this.userService.user$.set({
            username : decodedTokenSubject.username,
            email : decodedTokenSubject.email,
            roles: decodedTokenSubject.roles
          })
           this.successLogin = true
          console.log("signal ",this.userService.user$())
          setTimeout(()=>{
            this.router.navigate(['home'])
          })
          
        },
        error: (error)=>{
          console.log('Not logged in',error)
        }
      })


  }
  

 }
