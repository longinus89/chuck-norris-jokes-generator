import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { TagsListComponent } from './tags-list/tags-list.component';
import { FavoritesListCounterComponent } from './favorites-list-counter/favorites-list-counter.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule, MatButtonModule, MatChipsModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { UserBarComponent } from './user-bar/user-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginModule,
    RouterModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule
  ],
  declarations: [
    TagsListComponent,
    FavoritesListCounterComponent,
    NavbarComponent,
    HeaderComponent,
    ActionBarComponent,
    UserBarComponent
  ],
  exports: [
    TagsListComponent,
    FavoritesListCounterComponent,
    NavbarComponent,
    HeaderComponent,
    ActionBarComponent,
    UserBarComponent
  ]
})
export class SharedModule { }
