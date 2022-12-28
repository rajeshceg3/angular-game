import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, SquareComponent, BoardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

