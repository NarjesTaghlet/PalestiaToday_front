import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-component',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent{
color="red";
couleur_defaut="red";
constructor() {
}
  defaultcolor(){
    this.color=this.couleur_defaut ;
  }


changercouleur(input :string){
  this.color = input ;

}

}
