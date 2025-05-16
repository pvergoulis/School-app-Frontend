import { Component } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-we-are',
  imports: [NavbarBeforeLoginComponent, FooterComponent],
  templateUrl: './we-are.component.html',
  styleUrl: './we-are.component.css'
})
export class WeAreComponent {

}
