import { Component, Input } from '@angular/core';
import { Task } from './task.model';
import { CommonModule } from "@angular/common";
import { TasksService } from '../services/tasks.service';
import { CardComponent } from '../card/card.component';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CardComponent, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  constructor(private taskService: TasksService) {}

  onCompleteTask() {
    this.taskService.removeTask(this.task.id?? 0);
  }
}
