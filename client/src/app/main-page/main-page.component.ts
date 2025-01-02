import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from '../user/user.component';

import { User } from '../user/user.model';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';
import { Task } from '../task/task.model';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, NgFor, TasksComponent, HeaderComponent, UserComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  users: User[] = [];
  tasks: Task[] = [];
  selectedUserId?:number;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    // private cdRef: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchTasks();
  }

  // Fetch users from the UsersService
  fetchUsers(): void {
    this.usersService.fetchUsers(); // Fetch users via the service
    const subscription = this.usersService.usersSubject$.subscribe((users) => {
      this.users = users; // Update the users array when data is fetched
      //if i had changeDetection: ChangeDetectionStrategy.OnPush, i need :
      // this.cdRef.markForCheck();
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // Fetch tasks from the TasksService
  fetchTasks(): void {
    this.tasksService.fetchTasks(); // Fetch tasks via the service
    const subscription = this.tasksService.tasksSubject$.subscribe((tasks) => {
      this.tasks = tasks; // Update the tasks array when data is fetched
      //if i had changeDetection: ChangeDetectionStrategy.OnPush, i need :
      // this.cdRef.markForCheck();
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId)!;
  }

  onSelectUser(id: number) {
    this.selectedUserId = id;
      console.log('Selected user with id: ' + id);
  
    }

    addUser() {

    }
}
