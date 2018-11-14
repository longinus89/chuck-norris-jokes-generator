import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JokesListModule } from './jokes-list/jokes-list.module';
import { FavoritesListModule } from './favorites-list/favorites-list.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JokesListModule,
    FavoritesListModule,
    SharedModule
  ],
  declarations: []
})
export class PagesModule { }
