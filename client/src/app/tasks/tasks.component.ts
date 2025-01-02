import { Component, Input, inject, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

import { TaskComponent } from './task/task.component'; 
import { NewTaskComponent } from './new-task/new-task.component';
import { CommonModule, NgFor } from '@angular/common';
import { Task } from './task/task.model';


@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent, NgFor, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
@Input({ required: true }) userId!:number;
@Input({ required: true }) userName!:string;
isAddingTask:boolean = false;

constructor(private tasksService: TasksService) { }

// @Input() userName:string | undefined;


get selectedUserTasks() {
  return this.tasksService.getUserTasks(this.userId);
}

trackByTaskId(index: number, task: Task): number {
  return task.id ?? 0; 
}
  
  addTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
