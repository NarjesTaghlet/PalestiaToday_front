import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3000/article'; // Adjust the URL to your NestJS server

  constructor(private http: HttpClient,private authservice : AuthService) { }


  postArticle(title: string, description: string): Observable<any> {
 const params = new HttpParams().set('access_token',this.authservice.getToken());
    console.log(params)
    return this.http.post<any>(`${this.apiUrl}/add` , { title, description },{params});
  }

  getArticle(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  fetchArticleData(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${articleId}`);
  }
}
