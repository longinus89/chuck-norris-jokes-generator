import { Routes } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ActionBarComponent } from '../shared/action-bar/action-bar.component';
import { UserBarComponent } from '../shared/user-bar/user-bar.component';
import { JokesListComponent } from '../pages/jokes-list/jokes-list.component';
import { FavoritesListComponent } from '../pages/favorites-list/favorites-list.component';

export const AppChildrenRoutes: Routes = [
  {
    path: '',
    redirectTo: 'jokes',
    pathMatch: 'full'
  },
  {
    path: 'jokes',
    component: JokesListComponent
  },
  {
    path: 'favorites',
    component: FavoritesListComponent
  },
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
  },
  {
    path: '',
    component: ActionBarComponent,
    outlet: 'action-bar',
    children: [
      {
        path: '',
        component: UserBarComponent,
        outlet: 'user-bar'
      }
    ]
  }
];
