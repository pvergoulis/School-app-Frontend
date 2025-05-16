import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { adminUser } from 'src/app/shared/interfaces/user';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit-dialog',
  imports: [FormsModule,  MatDialogModule],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css'
})
export class UserEditDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<UserEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public user: adminUser
    ) {}

    close(): void {
      this.dialogRef.close();
    }

    save(): void {
      this.dialogRef.close(this.user); 
    }
}
