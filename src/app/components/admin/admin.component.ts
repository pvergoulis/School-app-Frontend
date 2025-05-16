import { Component } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-admin',
  imports: [NavbarBeforeLoginComponent, SideBarComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
