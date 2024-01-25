import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent {
constructor(public authservice : AuthService) {
}
}
