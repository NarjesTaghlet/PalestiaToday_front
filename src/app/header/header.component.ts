import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log("NavbarComponent - isLoggedIn status:", this.isLoggedIn);
    });
  }
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      console.log("Navbar isLoggedIn status:", this.isLoggedIn); // Debugging line
    });
  }

  isAdmin() {
    const token =this.authService.getToken();
    const user = this.authService.getUser(token);
    return user?.role === 'admin';

  }





  logout() {
    this.authService.logout();

  }
}
