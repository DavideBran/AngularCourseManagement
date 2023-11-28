import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAPIService } from '../Services/UserAPI.service';
import { Subscription } from 'rxjs';
import { compileNgModule } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private emailPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  userPassword = '';
  userEmail = '';
  emailClassList = 'form-control';

  invalidCredential = false;

  constructor(private userAPI: UserAPIService, private router: Router) { }

  async onSumbit() {

    if (!this.userPassword || !this.userEmail) {
      this.showError();
      return;
    }

    // Call the UserAPIService for logging in 
    const response$ = await this.userAPI.login(this.userEmail, this.userPassword);

    const responseSubscription: Subscription = response$.subscribe(
      {
        next: (userInfo) => {
          console.log(userInfo); 
          window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // redirect
          this.router.navigate(["../Course"]);
          
        },
        error: (err) => console.log(err),
        complete: () => responseSubscription.unsubscribe()
      }
    );


  }

  checkUserEmail() {
    if (!this.userEmail || !this.userEmail.match(this.emailPattern)) {
      this.invalidEmail();
      return;
    }
    else {
      this.emailClassList = this.emailClassList.split(" ").join(" ").replace("is-invalid", "");
    }
  }

  showError() {
    this.invalidCredential = true;
  }

  invalidEmail() {
    this.emailClassList += " is-invalid"
  }

}
