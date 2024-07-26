import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { ITask, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class TaskDetailComponent {
  private _route = inject(ActivatedRoute);
  private _taskService = inject(TaskService);
  private _taskId$ = this._route.paramMap.pipe(
    map((params) => params.get('id'))
  );
  task$: Observable<ITask | undefined> = this._taskId$.pipe(
    switchMap((id) => (id ? this._taskService.getTaskById(id) : of(undefined)))
  );
}
