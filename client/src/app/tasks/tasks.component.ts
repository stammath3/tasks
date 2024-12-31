import { Component, Input } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component'; 
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
@Input({ required: true }) userId!:string;
@Input({ required: true }) userName!:string;
isAddingTask:boolean = false;

constructor(private tasksService: TasksService) { }

// @Input() userName:string | undefined;

get selectedUserTasks() {
  return this.tasksService.getUserTasks(this.userId);
}
  
  addTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
