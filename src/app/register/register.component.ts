import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {error} from "@angular/compiler-cli/src/transformers/util";
// import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  email = '';
  confirmpassword = '';


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    /*this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });*/
  }

  onRegister() {
    /* if (this.registerForm.invalid) {
       return;
     }

 */
    //const { email,password,name } = this.registerForm.value;

    const email = this.email;
    const password = this.password;
    const username = this.username;
    if(this.mustMatch()) {
      this.authService.register(email, password, username).subscribe(
        (response) => {
          this.toastr.success('Registration successful. Please log in.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error)
          this.toastr.error('Registration failed. Please try again ', error.error.message);

        }
      );
    }
    else{
      this.toastr.error('Passwords do not match');

    }
  }


  public mustMatch() {
    return ( this.confirmpassword && this.password === this.confirmpassword )

  }







/*get name(): FormControl {
  return this.registerForm.get('name') as FormControl;
}

get email(): FormControl {
  return this.registerForm.get('email') as FormControl;
}

get password(): FormControl {
  return this.registerForm.get('password') as FormControl;
}

get confirmPassword(): FormControl {
  return this.registerForm.get('confirmPassword') as FormControl;
}

 */
}
