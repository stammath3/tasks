import { DestroyRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user.model';
import { environment } from '../shared/environment';

@Injectable({ providedIn: 'root' }) // This makes the service available throughout the app
export class UsersService {
  private readonly apiUrl= `${environment.apiUrl}users`;
  //Utilize DI to inject an instance of HttpClient
  constructor(private http: HttpClient, private destroyRef: DestroyRef) {}
  selectedUserId?: string;

  // Use BehaviorSubject to store and emit users data
  public usersSubject$ = new BehaviorSubject<User[]>([]);

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

}