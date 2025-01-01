import { Injectable, OnInit, inject } from "@angular/core";
import { type NewTaskData } from "./task/task.model";
import { HttpClient } from '@angular/common/http';
import { Task } from './task/task.model';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  http = inject(HttpClient);
  private subscription?: Subscription;
  tasks: Task[] = [];
  // private tasks = [{
  //       id:'t1',
  //       userId: '1',
  //       title:'Master Angular',
  //       summary:'Learn all the basic and advanced features of Angular & how to apply them. ',
  //       dueDate: '10/03/2025'
  //     },
  //     {
  //       id: 't2',
  //       userId: '3',
  //       title: 'Build first prototype',
  //       summary: 'Build a first prototype of the online shop website',
  //       dueDate: '2024-05-31',
  //     },
  //     {
  //       id: 't3',
  //       userId: '3',
  //       title: 'Prepare issue template',
  //       summary:
  //         'Prepare and describe an issue template which will help with project management',
  //       dueDate: '2024-06-15',
  //     },
  //     ];

      constructor() {
        const tasks = localStorage.getItem('tasks')
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }


      }

      getUserTasks(userId: string) {
        console.log('Getting tasks for user with id: ' + userId);
        return this.tasks.filter((task) => task.userId === userId);
      }

      fetchTasks(): void {
        console.log('TasksService initialized');
        this.subscription = this.http.get<Task[]>('https://localhost:5107/api/tasks').subscribe({
          next: response => this.tasks = response,
          error: error => console.log(error),
          complete: () => { 
            console.log('Request has completed');
            console.log(this.tasks);
            this.subscription?.unsubscribe();
          }
        });
    
      }

      // addTask(taskData: NewTaskData, userId: string) {
      //   this.tasks.unshift({
      //       id: new Date().getTime().toString(),
      //       userId: userId,
      //       title: taskData.title,
      //       summary: taskData.summary,
      //       dueDate: taskData.date,
      //     });

      //     this.saveTasks();
      // }

      addTask(taskData: NewTaskData, userId: string): void {
        // Prepare the task to be sent to the backend
        const newTask = {
          userId: parseInt(userId, 10),  // Ensure it's an integer
          title: taskData.title, // Required
          summary: taskData.summary || null, // Optional
          dueDate: taskData.date, // Required
        };
      
      
        // Send a POST request to the backend
        this.http.post<Task>('https://localhost:5107/api/tasks', newTask).subscribe({
          next: (createdTask) => {
            console.log('Task successfully created:', createdTask);
            // Get the updated list of tasks from the backend
            this.fetchTasks(); // Re-fetch tasks from the backend
          },
          error: (error) => {
            console.log('Error creating task:', error);
          }
        });
      }
      

      // removeTask(taskId: string) {
      //   this.tasks = this.tasks.filter((task) => task.id !== taskId);
      //   this.saveTasks();
      // 
      // }

      removeTask(taskId: string): void {
        // Send a DELETE request to the backend
        this.http.delete(`https://localhost:5107/api/tasks/${taskId}`).subscribe({
          next: () => {
            console.log(`Task with ID ${taskId} deleted successfully.`);
            // Get the updated list of tasks from the backend
            this.fetchTasks(); // Re-fetch tasks from the backend
          },
          error: (error) => {
            console.log('Error deleting task:', error);
          }
        });
      }

      private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
}