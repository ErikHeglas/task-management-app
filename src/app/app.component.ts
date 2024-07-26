import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ITask, TaskService } from './services/task.service';
import { mockData } from './mock-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-management';
  private _router = inject(Router);
  private _taskService = inject(TaskService);
  showButton$: Observable<boolean> = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      return event.urlAfterRedirects === '/task';
    })
  );

  constructor() {
    localStorage.setItem('tasks', JSON.stringify(mockData));
    this._taskService.loadTasksFromLocalStorage();
  }

  goToTaskList(): void {
    this._router.navigate(['task']);
  }

  goToAddNewTask(): void {
    this._router.navigate(['add/task']);
  }
}
