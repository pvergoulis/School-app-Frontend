import { Component } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-welcome',
  imports: [NavbarBeforeLoginComponent, FooterComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
