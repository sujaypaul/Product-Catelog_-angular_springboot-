import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../login/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions, FormControl } from "@angular/forms"




@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  id: any;
  name: any;
  brand: any;

  result: any;
  resultsize: any;
  filterData: any;
  filtersize: any;

  loginObj: LoginModel = new LoginModel();
  price: any;
  viewed: any;

  public brandfilter!: FormGroup;
  public pricefilter!: FormGroup;

  constructor(
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.name = this.activatedRoute.snapshot.paramMap.get("name");
    this.brand = this.activatedRoute.snapshot.paramMap.get("brand");


    this.brandfilter = this.formBuilder.group({
      brand: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]]
    })

    this.pricefilter = this.formBuilder.group({
      min: ['', Validators.required],
      max: ['', Validators.required]
    })


    this.getResults();


  }

  get formControl() {
    return this.brandfilter.controls;
  }
  Valid() {
    if (this.brandfilter.valid) {
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
      if(this.id!==" "){
        this.openSnackBar("brand filter not applicable on product code", 'mat-accent');
      }else{
        this.brand = this.brandfilter.value.brand;
        this.getResults();
      }
      
    }else{
      this.openSnackBar("Enter valid brand name", 'mat-primary');
    }
  }


  get priceControl() {
    return this.pricefilter.controls;
  }
  ValidPrice() {
    if (this.pricefilter.valid) {
      if(this.pricefilter.value.min<this.pricefilter.value.max){
        return true;
      }
      return false;
    }
    else {
      return false;
    }
  }

  priceFilter() {
    if (this.loggedin()) {
      if (this.ValidPrice()) {
        this.filterData = this.result.filter(
          (result: any) =>
            Number.parseInt(result.price) > this.pricefilter.value.min
            && Number.parseInt(result.price) < this.pricefilter.value.max
        );
        this.filtersize = this.filterData.length;
      }
      else {
        this.openSnackBar("Enter valid price range", 'mat-primary');
      }
    }
    else {
      this.openSnackBar("Login to use price filter", 'mat-accent')
    }
  }

  loggedin() {
    if (localStorage.getItem('username')) {
      return true;
    } else {
      return false;
    }
  }



  priceValue: any;
  view(id: any) {
    if (this.loggedin()) {
      this.viewed = true;
      this.api.getPrice(id)
        .subscribe(
          res => {
            this.priceValue = res;
            console.log(this.priceValue);
          },
          err => {
            return null
          }
        )

    } else {
      this.openSnackBar("Login to see Price", 'mat-accent')
    }
  }

  getResults() {
    if (this.id !== " ") {
      if (this.loggedin()) {
        this.api.getByIdWprice(this.id)
          .subscribe(res => {
            this.result = res;
            this.resultsize = res.length;
            
            this.filterData = this.result;
            this.filtersize = this.resultsize;
          })
      } else {
        this.api.getById(this.id)
          .subscribe(res => {
            this.result = res;
            this.resultsize = res.length;

            this.filterData = this.result;
            this.filtersize = this.resultsize;
          })
      }
    }
    else {
      if (this.loggedin()) {
        this.api.getSearchResultWprice(this.name, this.brand)
          .subscribe(res => {
            this.result = res;
            this.resultsize = res.length;

            this.filterData = this.result;
            this.filtersize = this.resultsize;
          })
      } else {
        this.api.getSearchResult(this.name, this.brand)
          .subscribe(res => {
            this.result = res;
            this.resultsize = res.length;
            
            this.filterData = this.result;
            this.filtersize = this.resultsize;
          })
      }

    }

  }



  showall: boolean = false;
  showAll() {
    if (this.loggedin()) {
      if (this.showall) {
        this.showall = false;
        this.viewed = false;
      } else {
        this.showall = true;
      }

    }
    else {
      this.openSnackBar("Login to see price", 'mat-accent')
    }
  }

  detail(id: any) {
    if (localStorage.getItem('username')
      && localStorage.getItem('password')) {
      this.route.navigate(['detail', id]);
    } else {
      this.openSnackBar("Login to see full details", 'mat-accent')
    }

  }

  openSnackBar(message: string, theme: string) {
    this.snackBar.open(message, 'close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', theme]
    });
  }


}
