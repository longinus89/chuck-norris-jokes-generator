import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesListComponent } from './jokes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
    MatIconModule
  ],
  declarations: [JokesListComponent]
})
export class JokesListModule { }
