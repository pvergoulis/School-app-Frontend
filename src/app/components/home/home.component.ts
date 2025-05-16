import { Component } from '@angular/core';

import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-home',
  imports: [ NavbarBeforeLoginComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
