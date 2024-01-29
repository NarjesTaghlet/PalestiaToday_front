import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth.service";
// import { fadeIn, cardAnimation } from './../animations'; // Update with your actual path

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush // Using OnPush for performance
  // animations: [fadeIn, cardAnimation]

})
export class ArticlesComponent implements OnInit {
  // isLoading = false;
  // hovering = false;
  articles:any[] = [];
  filteredArticles:any[] = [...this.articles];


  constructor(private router: Router, private articleService: ArticleService,private toastr : ToastrService,public authservice : AuthService) {

  }

  ngOnInit(): void {
    console.log("hani fl ngonit");
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
        (data: any) => {
          this.articles = data;
        },
        (error) => {
          console.error('Error loading articles', error);
          this.toastr.error("Error loading articles")
        }
    );
  }
  searchArticles(searchTerm: string): void {
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  showCard = false;

  // Method to toggle card visibility

  viewArticleDetail(articleId: number): void {

    if(this.authservice.isAuthenticated() ){
      this.router.navigate(['/article', articleId]);

    }else{
      this.showCard = !this.showCard;
      //this.router.navigate(['/read-more'])
    }
  }

  getSummary(content: string): string {
    const firstSentence = content.split(/(?<=[.?!])\s/, 1)[0];
    return firstSentence;
  }

  readonly staticImages: string[] = [
    './../../assets/images/bg1.jpg',
    './../../assets/images/bg3.jpg',
    './../../assets/images/bg4.jpg',
    './../../assets/images/header.jpg',
    './../../assets/images/bg2.jpg',
    // ... other images
  ];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pages: number[] = [];
  paginatedArticles: any[] = [];

  getImageForArticle(index: number): string {
    return this.staticImages[index % this.staticImages.length];
  }

  redirectToReadMore() {
    // Check if the user is a visitor or not admin and not abonne
    const isAdmin = this.authservice.isAdmin()
    const isAbonne = this.authservice.getUser(this.authservice.getToken())?.role

    if ( !isAdmin && !isAbonne) {
      // Navigate to the ReadMoreComponent
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/home'])
    }
  }

    redirectToLogin(){
        this.router.navigate(['/Login']);

    }
}
