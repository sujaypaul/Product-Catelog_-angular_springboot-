import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: any;
  detail: any;
  public form!: FormGroup
  message: any;
  submitted: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api : ApiService
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    
    this.getDetail();
    
    this.form = this.formBuilder.group({
      code:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })

  }

  getDetail(){
    this.api.getDetails(this.id)
    .subscribe(res => {
      this.detail = res;
    }
    )
  }

  get formControl() {
    return this.form.controls;
  }

  Valid() {
    if (this.form.valid) {
      return true;
    }
    else {
      return false;
    }
  }
  search(){
    this.message=null;
    if(this.Valid()){
      this.submitted=true;
      this.api.getService(this.id,this.form.value.code)
      .subscribe(
        res =>{
          this.message = res;
        }
      )
    }
  }
}
