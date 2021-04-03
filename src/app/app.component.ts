import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  constructor() {
  }
  
  close() {
    this.navbar.close();
  }

}
