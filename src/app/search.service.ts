import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url='http://www.omdbapi.com/';
  constructor(private httpClient:HttpClient) { }

  getSearchResults(params_:any):Observable<any>{
    return this.httpClient.get<any>(this.url,{params: params_});
  }

}
