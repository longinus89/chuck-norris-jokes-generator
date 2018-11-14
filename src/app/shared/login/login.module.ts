import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';

import { LoginComponent } from './login.component';
import { LoginModalComponent } from './loginModal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [
    LoginComponent,
    LoginModalComponent
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class LoginModule { }
