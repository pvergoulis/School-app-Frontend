import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { adminUser } from '../../interfaces/user';



@Component({
  selector: 'app-user-create-dialog',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './user-create-dialog.component.html',
  styleUrl: './user-create-dialog.component.css'
})
export class UserCreateDialogComponent {

  newUser: adminUser = {
    username: '',
    email: '',
    roles: [''],
    password: ''
  };

  constructor(public dialogRef: MatDialogRef<UserCreateDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  register(): void {
    this.dialogRef.close(this.newUser); 
  }
}
