import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from "@angular/forms"
import { RegisterModel } from './register.model';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerObj: RegisterModel = new RegisterModel();
  submitted = false;
  public registerForm!: FormGroup

  constructor(
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirm_password: ['', Validators.required]
    },
      { validator: this.passwordMatchValidator as AbstractControlOptions }
    )
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirm_password'].value ? null : { 'mismatch': true };
  }

  get formControl() {
    return this.registerForm.controls;
  }

  Valid() {
    this.submitted = true;
    if (this.registerForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  openSnackBar(message: string, theme: string) {
    this.snackBar.open(message, 'close', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', theme]
    });
  }

  register() {
    this.submitted = false;
    if (this.Valid()) {
      this.registerObj.email = this.registerForm.value.email.toLowerCase();

      const firstName = this.registerForm.value.first_name;
      this.registerObj.firstName = firstName[0].toUpperCase() + firstName.substring(1).toLowerCase();

      const lastName = this.registerForm.value.last_name;
      this.registerObj.lastName = lastName[0].toUpperCase() + lastName.substring(1).toLowerCase();

      this.registerObj.password = this.registerForm.value.password;

      this.http.post("http://localhost:8081/ProductCatalog/user/register", this.registerObj)
        .subscribe(res => { }, err => {
          //user created
          if (err.status === 201) {
            
            let ref = document.getElementById('regClosebttn')
            ref?.click();

            this.openSnackBar(err.error.text,'mat-warm')
          }
          //user already exist
          if (err.status === 405) {
        
            let ref = document.getElementById('regClosebttn')
            ref?.click();
            
            this.openSnackBar(err.error,'mat-primary')
          }
        }

        )
    }
  }

  clear() {
    this.registerForm.reset();
    this.registerForm.markAsUntouched();
    this.formControl.controls.reset();
    this.formControl.controls.markAsUntouched();
    this.formControl.errors.reset();
  }

}
