import { Component } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent  {

  constructor() { 
    setInterval(()=> this.rando = Math.random(),500)
}