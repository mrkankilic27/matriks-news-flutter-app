import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Categories,Headers,Details } from '../models/newsModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http:HttpClient) { }

getCategories():Observable<Categories>{
  return this.http.get<Categories>(environment.apiBaseUrl,{
    headers:new HttpHeaders(environment.defaultTag),
    params:new HttpParams()
    .set('type','newsCategory')})
}

getHeaders():Observable<Headers>{
  return this.http.get<Headers>(environment.apiBaseUrl,{
    headers:new HttpHeaders(environment.defaultTag),
    params:new HttpParams()
    .set('type','newsHeader')})
}

getNewsDetail(id:number):Observable<Details>{
  return this.http.get<Details>(environment.apiDetailUrl,{
    params:new HttpParams()
    .set('id',id)})
}
}
