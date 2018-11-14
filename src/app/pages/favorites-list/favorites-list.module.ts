import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from './favorites-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    SharedModule
  ],
  declarations: [FavoritesListComponent]
})
export class FavoritesListModule { }
