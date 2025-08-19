import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']  // This now points to the file we created
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      message: string,
      title?: string,
      confirmText?: string,
      cancelText?: string 
    }
  ) { 
    // Set default values if not provided
    this.data.title = this.data.title || 'Confirm';
    this.data.confirmText = this.data.confirmText || 'Yes';
    this.data.cancelText = this.data.cancelText || 'No';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}