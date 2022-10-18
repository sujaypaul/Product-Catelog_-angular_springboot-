import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions, FormControl } from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public searchForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      param:[''],
      name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]*$/),this.noWhitespaceValidator]],
      brand: ['']
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  get formControl() {
    return this.searchForm.controls;
  }

  Valid() {
    if (this.searchForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  submitted: boolean = false;
  search() {
    this.submitted = true;
    if (this.Valid()) {

      if(this.searchForm.value.param==="id") {
        this.route.navigate(['result',this.searchForm.value.name," "," "]);
      }
      else {
        if(this.searchForm.value.brand) {
          if(this.searchForm.value.name) {
            this.route.navigate(['result'," ",this.searchForm.value.name,this.searchForm.value.brand])
          }
          else {
            this.route.navigate(['result'," "," ",this.searchForm.value.brand])
          }
        }
        else {
          this.route.navigate(['result'," ",this.searchForm.value.name," "])
        }
      }
    }
  }

  selectid() {
    if(this.searchForm.value.param==="id"){
      return true;
    }
    return false;
  }
}
