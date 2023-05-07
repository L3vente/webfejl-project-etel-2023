import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  bad = false;
  error?: string;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading: boolean = false;

  constructor(private router: Router, private asutService: AuthService) { }
  login() {
    if (this.email.value?.trim().length != 0 && this.password.value?.trim().length != 0) {
      this.loading = true;
      this.asutService.login(this.email.value as string, this.password.value as string).then(cred => {
        // setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/main');
        // }, 1500);


      }).catch(error => {
        this.bad = true;
        this.error = error as string;
        this.loading = false;
      })
    }

  }
}
