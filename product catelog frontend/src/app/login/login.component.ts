import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: LoginModel = new LoginModel();


  public loginForm!: FormGroup
  constructor(
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  openSnackBar(message: string, theme: string) {
    this.snackBar.open(message, 'close', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', theme]
    });
  }

  login() {

    this.loginObj.email = this.loginForm.value.email;
    this.loginObj.password = this.loginForm.value.password;

    this.http.post("http://localhost:8081/ProductCatalog/user/", this.loginObj)
      .subscribe(res => { }, err => {
        //succesfull login
        if (err.status === 202) {
          localStorage.setItem('username', this.loginForm.value.email);
          localStorage.setItem('password', this.loginForm.value.password);

          this.loginForm.reset();
          let ref = document.getElementById('cancellogin')
            ref?.click();
          window.location.reload();          
        }
        //incorrect password
        if (err.status === 401) {
          this.loginForm.controls['password'].reset();
          let ref = document.getElementById('cancellogin')
            ref?.click();
          this.openSnackBar(err.error,'mat-primary')
        }
        //User not found
        if (err.status === 404) {
          this.loginForm.controls['password'].reset();
          let ref = document.getElementById('cancellogin')
            ref?.click();
          this.openSnackBar(err.error,'mat-accent')
        }
      }

      )
  }

  clear() {
    this.loginForm.reset();
  }

}
