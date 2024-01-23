import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-fils',
  templateUrl: './fils.component.html',
  styleUrls: ['./fils.component.css']
})
export class FilsComponent implements  OnInit{
  // on ajoute @input pour que le père voit les propriétés des fils
@Input() filsProperty : string | undefined;

myFavoriteColor: string = '#339966';

@Output() favoriteColorChanged = new EventEmitter<string>();

changeFavoriteColor() {
  // Émettre la nouvelle couleur préférée vers le composant parent
    this.favoriteColorChanged.emit(this.myFavoriteColor);
    }
ngOnInit() {

  console.log(this.filsProperty) ;
}
}