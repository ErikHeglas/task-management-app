import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from './ui/task.component';
import { ITask, TaskService } from '../../services/task.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
  imports: [TaskComponent, CommonModule, MatButtonModule],
})
export class TaskListComponent implements OnInit {
  private _taskService = inject(TaskService);
  private _router = inject(Router);
  tasks$: Observable<ITask[]> = of([]);

  ngOnInit(): void {
    this.tasks$ = this._taskService.getTasks();
  }

  showTaskDetails(taskId: string): void {
    this._router.navigate(['task', taskId]);
  }

  deleteTask(taskId: string): void {
    this._taskService.deleteTask(taskId);
  }
}
