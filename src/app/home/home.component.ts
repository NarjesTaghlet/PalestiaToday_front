import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';

interface Article {
  title: string;
  summary: string;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  showBackToTopButton = true;

  articles: Article[] = [
    {
      title: 'Article 1',
      summary: 'Summary of Article 1',
      image: 'assets/images/bg3.jpg'
    },
    {
      title: 'Article 2',
      summary: 'Summary of Article 2',
      image: 'assets/images/bg1.jpg'
    },
    {
      title: 'Article 3',
      summary: 'Summary of Article 3',
      image: 'assets/images/bg3.jpg'
    },
    {
      title: 'Article 4',
      summary: 'Summary of Article 4',
      image: 'assets/images/bg4.jpg'
    },
    {
      title: 'Article 5',
      summary: 'Summary of Article 5',
      image: 'assets/images/bg1.jpg'
    },
    // Add more fake articles here
    //add the articles in our database here hehe
  ];

  constructor(private router: Router, private toastr: ToastrService) {}

  activeSlideIndex = 0;

  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.articles.length;
  }

  prevSlide(): void {
    this.activeSlideIndex =
      this.activeSlideIndex === 0 ? this.articles.length - 1 : this.activeSlideIndex - 1;
  }


  openArticle(articleId: number): void {
    this.toastr.info('Redirecting to article...');
    //supposons que la route est /article/sonId
    this.router.navigate(['/article', articleId]);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showBackToTopButton = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 20;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
