import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>My First Angular 2 App</h1>
    <h3>One of my favorite bands is: {{ favoriteBand }}</h3>
  <!-- We telling Angular that anything in {{}} to show its value-->
    <p>If I had to choose a favorite painter it would be: {{ favoritePainter }}</p>
    <p>The number of slices of pie I would like is: {{ slicesOfPie }}</p>
    <h3>One of my favorite Albums is: </h3>
    <p>{{ favoriteAlbum.title }}</p>
    <p>By {{ favoriteAlbum.artist }}</p>
    <p>Released in {{ favoriteAlbum.released }}</p>
    <h3>Here are my favorite pies!</h3>
    <div class="pie" *ngFor="letcurrentPie of favoritePies">
      <!--use directive to loop, we can also use this to display a list of our objects-->
      <p>{{ currentPie }}</p>
    </div>
    <h3>Here are my favorite albums</h3>
    <div class="album" *ngFor="let album of albums">
      <p>{{ album.title }}</p>
      <p>By {{ album.artis }}</p>
      <p>Released in {{ album.released }}</p>
    </div>
  </div>
  `
})

export class AppComponent {
  favoriteBand: string = 'RadioHead';
  favoritePainter: string = 'Jason';
  slicesOfPie: number = 2;
  favoriteAlbum: Album = new Album("Disintergration", "The Cure", 1989)
  /** //this is how to comment in Typscript
  <!-- Create new; class Album using export so it can be access by other files--> */
  favoritePies: string[] = ["Apple", "Banana Cream", "Blackberry"];
  albums: Album[] = [
    new Album("Pulse", "Pink Floyd", 1995),
    new Album("Sound", "Sound Gardern", 1996),
    new Album("My way", "DinosaurJr.", 1994)
  ];
}

export class Album {
  constructor (public title: string, public artist: string, public released: number) { }
}

(click)="doStuff()" = called output binding to the tag emitting the click event that we want
