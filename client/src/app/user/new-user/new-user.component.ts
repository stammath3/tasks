import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
 @Output() close = new EventEmitter<void>();
  constructor(
       private userService: UsersService     
      ) {}
     usernameField = '';
     avatarField = '';
     avatarImages: string[] = [
      'assets/users/user-1.jpg',
      'assets/users/user-2.jpg',
      'assets/users/user-3.jpg',
      'assets/users/user-4.jpg',
      'assets/users/user-5.jpg',
      'assets/users/user-6.jpg'
    ];

     onCancel() {
      this.close.emit();  // Optional: Emit the close event
    }

    onSubmit() {
      if (this.usernameField) {
        const user = {
          userName: this.usernameField,
          avatar: this.avatarField? this.avatarField : '',
        }
        this.userService.createUser(user);
        this.close.emit();
        }
      }
      
      selectAvatar(avatar: string): void {
        this.avatarField = avatar;
      }
}
