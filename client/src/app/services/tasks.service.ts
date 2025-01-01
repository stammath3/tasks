import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Task } from '../tasks/task/task.model';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { environment } from "../shared/environment";

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}
  
  private readonly apiUrl= `${environment.apiUrl}tasks`;
 // Use BehaviorSubject to store and emit tasks data
 private tasksSubject = new BehaviorSubject<Task[]>([]);
 tasks$ = this.tasksSubject.asObservable(); // Observable to be used in the component

  // private subscription?: Subscription;

   // Get tasks for a specific user by filtering tasks based on userId
   getUserTasks(userId: number) {
    console.log('Getting tasks for user with id: ' + userId);
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.userId === userId))
    );
  }

      fetchTasks(): void {
        console.log('TasksService initialized');
        // this.subscription = 
        this.http.get<Task[]>(this.apiUrl).subscribe({
          next: response => this.tasksSubject.next(response),
          error: error => console.log(error),
          complete: () => { 
            console.log('Request has completed');
            console.log(this.tasksSubject.value);
            // this.subscription?.unsubscribe();
          }
        });
    
      }
      
      addTask(task: Task): void {

        // Send a POST request to the backend
        this.http.post<Task>(this.apiUrl, task).subscribe({
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

      removeTask(taskId: number): void {
        // Send a DELETE request to the backend
        this.http.delete(`${this.apiUrl}/${taskId}`).subscribe({
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
}