import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user/user.model';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, TasksComponent, HeaderComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  http = inject(HttpClient);
  title = 'client';
  // users: any;
  users = DUMMY_USERS;
  selectedUserId?:string;

  ngOnInit(): void {
    // this.http.get('https://localhost:5107/api/users').subscribe({
    //   next: response => this.users = response,
    //   error: error => console.log(error),
    //   complete: () => console.log('Request has completed')
    // });

  }

  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId)!;
  }

  onSelectUser(id: string) {
    //  const user = DUMMY_USERS.find(user => user.id === id);
    //   this.userName = user!.name;
    this.selectedUserId = id;
      console.log('Selected user with id: ' + id);
  
    }
}
