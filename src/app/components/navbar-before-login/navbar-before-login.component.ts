import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { UserService } from 'src/app/shared/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-before-login',
  imports: [RouterLink, MatIconModule,CommonModule],
  templateUrl: './navbar-before-login.component.html',
  styleUrl: './navbar-before-login.component.css'

})
export class NavbarBeforeLoginComponent {
    userService = inject(UserService)
    user = this.userService.user$
    

  logout(){
    this.userService.logoutUser()
  }

  
}
