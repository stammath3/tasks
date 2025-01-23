import { DestroyRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user/user.model';
import { environment } from '../shared/environment';

@Injectable({ providedIn: 'root' }) // This makes the service available throughout the app
export class UsersService {
  private readonly apiUrl= `${environment.apiUrl}/users`;
  //Utilize DI to inject an instance of HttpClient
  constructor(private http: HttpClient, private destroyRef: DestroyRef) {}
  selectedUserId?: string;

  // Use BehaviorSubject to store and emit users data
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  // Public read-only Observable to expose the state
  public users$ = this.usersSubject$.asObservable(); // Expose as read-only observable

    fetchUsers(): void {
      const subscription = this.http.get<User[]>(this.apiUrl).subscribe({
        next: (response) => (this.usersSubject$.next(response)),
        error: (error) => console.log(error),
        complete: () => console.log('Fetched users:', this.usersSubject$.value),
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  
    onSelectUser(id: string): void {
      this.selectedUserId = id;
      console.log('Selected user with id:', id);
    }

    // Create a new user
  createUser(user: User): void {
    const subscription = this.http.post<User>(this.apiUrl, user).subscribe({
      next: (newUser) => {
        console.log('Created user:', newUser);
        const currentUsers = this.usersSubject$.value;
        this.usersSubject$.next([...currentUsers, newUser]); // Add new user to the current state
      },
      error: (error) => console.error('Error creating user:', error),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // Delete a user by ID
  deleteUser(id: number): void {
    const subscription = this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        console.log(`Deleted user with id: ${id}`);
        const currentUsers = this.usersSubject$.value;
          this.usersSubject$.next(
            currentUsers.filter((user) => user.id !== id)
          ); // Remove user from the current state
      },
      error: (error) => console.error(`Error deleting user with id: ${id}`, error),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}