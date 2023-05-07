import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  constructor(private location: Location, private authService: AuthService, private userService: UserService, private cartServie: CartService,private router: Router) { }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rePassword: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    name: new FormGroup({
      lastname: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required])
    }),

  }, { validators: this.passwordsMatchValidator });
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('rePassword');
    const phone = control.get('phone')?.value as string;
    const email = control.get('email')?.value as string;
    const phoneno = /^(\+36|06)(20|30|31|50|70)\d{7}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordsMatch': true };
    }
    if (phone && !phone.match(phoneno)) {
      return { 'badPhone': true };
    }
    if (email && !email.match(emailRegex)) {
      return { 'badEmail': true };
    }

    return null;
  }

  onSubmit() {
    this.loading = true;
    this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred => {

      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('email')?.value?.split('@')[0] as string,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        },
        address: this.signUpForm.get('address')?.value as string,
        phone: this.signUpForm.get('phone')?.value as string
      }
      this.userService.create(user).then(_ => {
       
        
      }).catch(error => {
        this.loading = false;
        console.error(error);
      })

      let cart  = {
        userId: user.id,
        menus: []
      }
      this.cartServie.createCart(cart,user).then(_=>{
        this.loading = false;
        console.log("User added successfully");
        this.router.navigateByUrl('/main');
      }).catch(error =>{
        console.error(error);
      })
    }).catch(error => {
      this.loading = false;
      console.log(error);
    })
  }
  goBack() {
    this.location.back();
  }
}
