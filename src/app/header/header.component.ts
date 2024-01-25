import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        // Set initial login status
        this.isLoggedIn = this.authService.isAuthenticated();
        // Subscribe to login status changes
        this.authService.isLoggedIn$.subscribe((loggedInStatus) => {
            this.isLoggedIn = loggedInStatus;
            console.log("Navbar isLoggedIn status:", this.isLoggedIn);
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
