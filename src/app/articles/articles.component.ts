import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
// import { fadeIn, cardAnimation } from './../animations'; // Update with your actual path

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Using OnPush for performance
  // animations: [fadeIn, cardAnimation]

})
export class ArticlesComponent implements OnInit {
  // isLoading = false;
  // hovering = false;
  articles = [
    {
      id: 1, // make sure each article has a unique id
      title: 'The Resilience of Hope',
      summary: 'Amidst the shadows of conflict, the spirit of perseverance emerges in the streets of Gaza.',
      image: 'https://via.placeholder.com/400x200/000000/FFFFFF/?text=Palestine+1',
      date: new Date('2024-01-20')
    },
    {
      id: 2, // make sure each article has a unique id
      title: 'Echoes of Yesterday',
      summary: 'A reflection on the historical narratives that continue to shape the landscape of the West Bank.',
      image: 'https://via.placeholder.com/400x200/000000/FFFFFF/?text=Palestine+2',
      date: new Date('2024-01-22')
    },
    {
      id: 3, // make sure each article has a unique id
      title: 'A Glimpse Beyond the Wall',
      summary: 'Exploring the day-to-day life and culture that thrives beyond the barriers.',
      image: 'https://via.placeholder.com/400x200/000000/FFFFFF/?text=Palestine+3',
      date: new Date('2024-01-25')
    },
    // ...hedhom fake taw mba3ed ki norbtou tet7assen
  ];

  filteredArticles = [...this.articles];


  constructor(private router: Router, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticle().subscribe((data: any) => {
      this.articles = data;
      this.filteredArticles = data;
    });
  }

  searchArticles(searchTerm: string): void {
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  viewArticleDetail(articleId: number): void {
    this.router.navigate(['/article', articleId]);
  }

}
