import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginModel } from '../login/login.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loginObj: LoginModel = new LoginModel();

  constructor(
    private http: HttpClient
  ) { }

  getSearchResult(name:string,brand:string) {
    return this.http.get<any>("http://localhost:8081/ProductCatalog/search/title="+name+"&brand="+brand)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSearchResultWprice(name:string,brand:string) {
    this.loginObj.email = localStorage.getItem('username');
    this.loginObj.password = localStorage.getItem('password');
    return this.http.post<any>("http://localhost:8081/search/title="+name+"&brand="+brand,this.loginObj)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getById(id: string){
    return this.http.get<any>("http://localhost:8081/ProductCatalog/search/id="+id)
    .pipe(map((res:any)=> {
      return res;
    }))
  }
  getByIdWprice(id: string){
    this.loginObj.email = localStorage.getItem('username');
    this.loginObj.password = localStorage.getItem('password');
    return this.http.post<any>("http://localhost:8081/search/id="+id,this.loginObj)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

  getDetails(id:any){
    this.loginObj.email = localStorage.getItem('username');
    this.loginObj.password = localStorage.getItem('password');

    return this.http.post<any>("http://localhost:8081/ProductCatalog/search/detail="+id,this.loginObj)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getService(code:any, pincode:any){
    this.loginObj.email = localStorage.getItem('username');
    this.loginObj.password = localStorage.getItem('password');

    return this.http.post<any>("http://localhost:8081/ProductCatalog/search/id="+code+"/pincode="+pincode,this.loginObj)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getPrice(id: any){

    this.loginObj.email = localStorage.getItem('username');
    this.loginObj.password = localStorage.getItem('password');

    return this.http.post<any>("http://localhost:8081/ProductCatalog/search/price="+id,this.loginObj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
