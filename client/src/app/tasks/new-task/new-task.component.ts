import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: number;
  @Output() close = new EventEmitter<void>();

    constructor(
      private tasksService: TasksService
    ) {}

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    const task = {
      userId: this.userId,
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    }
    this.tasksService.addTask(task);
    this.close.emit();
  }

}
