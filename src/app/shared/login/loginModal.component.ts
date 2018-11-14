import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login.component';
@Component({
  selector: 'app-login-modal',
  templateUrl: './loginModal.component.html',
  styleUrls: []
})
export class LoginModalComponent implements AfterViewInit, OnDestroy {

  private dialogRef;

  constructor(private dialog: MatDialog) {
  }

  public ngAfterViewInit() {
    this.openLoginDialog();
  }

  openLoginDialog() {
    Promise.resolve().then(() => {
      this.dialogRef = this.dialog.open(LoginComponent, {
        width: '600px',
        disableClose: true
      });
    });
  }

  ngOnDestroy(): void {
    this.dialogRef.close();
  }
}
