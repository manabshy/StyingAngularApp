import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars = [
    'svg-1','svg-2','svg-3','svg-4'
  ]
  user: User;
  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>,private userService: UserService) { }
  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }

    return this.name.hasError('required') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    this.user = new User();

  }
  save(): void {
    this.user.name = this.name.value;
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(this.user);
    });
  }
  cancel(): void {
    this.dialogRef.close(null);
  }
}
