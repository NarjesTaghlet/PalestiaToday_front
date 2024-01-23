import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ArticleService} from "../services/article.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-mini-word',
  templateUrl: './mini-word.component.html',
  styleUrls: ['./mini-word.component.css'],
})
export class MiniWordComponent {
  textColor: string = '';
  fontSize: number = 16;
  fontFamily: string = 'Arial';
  showEmojiPicker = false;

  editableText = ''; // Default text for the editable area
  highlightedWords = ['Palestine', 'peace', 'free']; // Words to highlight  MAT7EBBECH TEMCHI L FAZAAAA

  constructor(private router: Router, private toastr: ToastrService , private articleservice : ArticleService) {
  }

  articleTitle: string = '';
  lastKnownRange: Range | null = null;

  textStyle: any = {};
  readonly staticImages: string[] = [
    './../../assets/images/bg1.jpg',
    './../../assets/images/bg3.jpg',
    './../../assets/images/bg4.jpg',
    './../../assets/images/header.jpg',
    './../../assets/images/bg2.jpg',
  ];

  applyStyle(): void {
    this.textStyle = {
      'color': this.textColor,
      'font-size': `${this.fontSize}px`,
      'font-family': this.fontFamily,
    };
  }

  toggleStyle(style: string): void {
    document.execCommand(style, false);
  }

  updateText(event: Event): void {
    const element = event.target as HTMLElement;
    this.editableText = element.innerText;
  }

  applyBold(): void {
    document.execCommand('bold', false);
  }

  applyItalic(): void {
    document.execCommand('italic', false);
  }

  publishArticle(): void {
    const articleContent = this.editableText;
    // Basic Validation ll mini word
    if (!this.articleTitle.trim()) {
      this.toastr.error('Please enter a title for the article.');
      return;
    }

    if (!this.editableText || !this.editableText.trim()) {
      this.toastr.error('Please enter content for the article.');
      return;
    }

    // console.log('Content:', this.editableText); // Debugging hehe
    this.articleservice.postArticle(this.articleTitle,articleContent).subscribe(
      (response) =>{
        this.toastr.success('Article successfully added');
        // redirect to the articles page
        this.router.navigate(['/articles']);

      },
    (error) =>{
      this.toastr.error('Error adding article ');

    }
    )

  }

  getRandomImage(): string {
    return this.staticImages[Math.floor(Math.random() * this.staticImages.length)];
  }

  generateUniqueId(): number {
    // Implement unique ID generation logic. For example:
    return Date.now(); // Simple example, might not be unique in all cases
  }
  // toggleEmojiPicker(): void {
  //   this.showEmojiPicker = !this.showEmojiPicker;
  // }

  // insertEmoji(emoji: string): void {
  //   const contentDiv = document.querySelector('.editable-text') as HTMLElement;
  //   if (!contentDiv) return;

  //   // Insert emoji at cursor position
  //   const selection = window.getSelection();
  //   if (selection && selection.rangeCount > 0) {
  //     const range = selection.getRangeAt(0);
  //     range.deleteContents();

  //     const textNode = document.createTextNode(emoji);
  //     range.insertNode(textNode);

  //     range.setStartAfter(textNode);
  //     range.setEndAfter(textNode);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }

  //   this.updateEditableText(); // Update the editableText property
  //   this.showEmojiPicker = false; // Close the emoji picker
  // }


  updateEditableText(): void {
    const contentDiv = document.querySelector('.editable-text') as HTMLElement;
    if (contentDiv) {
      this.editableText = contentDiv.innerText;
    }
  }
  onContentChange(event: Event): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.lastKnownRange = selection.getRangeAt(0);
    }
    this.updateEditableText();
  }

}
