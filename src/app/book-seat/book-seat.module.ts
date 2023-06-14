import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookSeatRoutingModule } from './book-seat-routing.module';
import { BookSeatComponent } from './book-seat/book-seat.component';


@NgModule({
  declarations: [
    BookSeatComponent
  ],
  imports: [
    CommonModule,
    BookSeatRoutingModule
  ]
})
export class BookSeatModule { }
