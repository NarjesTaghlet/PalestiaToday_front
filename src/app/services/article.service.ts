import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3000/article';
  private  apiUrl2='http://localhost:3000/interactionarticle' ;

  constructor(private http: HttpClient,private authservice : AuthService) { }


  postArticle(title: string, description: string): Observable<any> {
 const params = new HttpParams().set('access_token',this.authservice.getToken());
    console.log(params)
    return this.http.post<any>(`${this.apiUrl}/add` , { title, description },{params});
  }

  getArticles(): Observable<any>{
      console.log("hani fl getarticles m service")
      console.log('apiurl:',this.apiUrl)
    console.log(this.http.get<any>(`${this.apiUrl}`))
    return this.http.get<any>(`${this.apiUrl}`);
  }

  fetchArticleData(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${articleId}`);
  }

  getComments(articleId : number):Observable<any> {
      return this.http.get<any>(`${this.apiUrl2}/comment/${articleId}`);
  }


  addcomment(contenu : string , articleId : number , idUser: number):Observable<any>{
    console.log("aslema")
    console.log(contenu)
    console.log(articleId)
    console.log(this.http.post<any>(`${this.apiUrl2}/comment/${articleId}/${idUser}`,{contenu}))
      return this.http.post<any>(`${this.apiUrl2}/comment/${articleId}/${idUser}`,{contenu});

  }
}
