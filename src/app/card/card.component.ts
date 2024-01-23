import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  color = 'White';
  nom = 'Name';
  firstname = 'FirstName';
  job = 'STUDENT';
  path = '/assets/profile.png'; // Default image path
  citation = 'Citation';
  travail = 'Job Description';
  Mots_cles = 'Mots clés pour votre travail';

  imagePath: string = ''; // Initialize imagePath

  submitForm(form: any) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
    }
  }

  // la couleur de background du Div du père doit prendre la couleur favorite du fils.
  changer_couleur(newColor: string) {
    this.color = newColor;
  }
}
