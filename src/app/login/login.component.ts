import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Adjust the path as per your project structure
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
import {User} from "../Model/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  user! : User | null ;

  constructor(private fb: FormBuilder, private authService: AuthService,private toastr: ToastrService,private router: Router) {

  }

  // Getter methods for easy access to form fields


  /*onLogin() {
    if (this.loginForm.valid) {
      // Safely accessing form control values
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      // Perform the login action
      const success = this.authService.login(email, password);
      if (success) {
      this.toastr.success('Login successful', 'Success');

        console.log('Login Successful');
        // Navigate to another route or perform additional actions
      } else {
        console.log('Login Failed');
        this.toastr.error('Login Failed :( ', 'Error');

        // Handle login failure
      }
    } else {
      // Form is invalid
      console.log('Form is Invalid');
    }
  }*/
  OnLogin() {
   console.log("hahahaha")
    this.authService.login(this.credentials).subscribe(
      response => {
          this.authService.isLoggedIn.next(true)
          localStorage.setItem('access_token', response.access_token);
        //es dpnnées de user
        this.user = this.authService.getUser(response.access_token);
        console.log("hani baad")
          if(this.user?.role==='admin'){
          this.router.navigate(['/word']);
        }else{
          //console.log("ahla wa sahla")
          this.router.navigate(['/articles']);

        }
       // console.log("hello hello")
        //console.log(this.user)
        this.toastr.success('Login successful', 'Success');

        //console.log("hi")
        //console.log(response.access_token)

         // Redirect to your dashboard or any other page

      },
      error => {
        console.log("erreurrrrrr");
        console.error('Login failed', error);
        this.toastr.error('Login Failed :(  , veuillez vérifier vos credentials', 'Error');
        // Handle login error, show error message, etc.
      }
    );
    return this.user;
  }



  /*private getUser(token: string): User | null {
    if (!token) {
      //console.log("erreur")
      return null
    }
    //console.log(JSON.parse(atob(token.split('.')[1])) as User)
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
  */


  /*OnLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.credentials)
      .subscribe((response) => {
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['/word']);
      });
  }
*/
}
