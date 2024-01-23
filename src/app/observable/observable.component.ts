import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements  OnInit{

  MonObservable! : Observable<any> ;
  Images  = [
       'ons.png',
      'mouna.png',
      'jess.jpg',
      '404_error.jpg',
      'mariem.png',

  ];

  CurrentImage = '.png';

constructor() {
}
  ngOnInit() {
    //creation de l'observable
  this.MonObservable = new Observable(
      (observer) => {
          let i = this.Images.length - 1
          console.log(i)
        setInterval(
            () => {
                //a chaque fois on envoie une image
                observer.next(this.Images[i]);
                if (i>0)
                {i--;
                }else {
                    //reveneir a la premierre case du tab
                     i = this.Images.length - 1

                }

            }
            ,1000);

      }

  );
  //s'inscrire a  l' observable  , affecter le flux de données a image
  this.MonObservable.subscribe(

      (result) => { this.CurrentImage = result ;
      console.log(result)}

  )

  }

}

