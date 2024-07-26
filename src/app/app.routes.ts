import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'task',
    loadComponent: () =>
      import('./components/task-list/task-list.component').then(
        (m) => m.TaskListComponent
      ),
  },
  {
    path: 'task/:id',
    loadComponent: () =>
      import('./components/task-detail/task-detail.component').then(
        (m) => m.TaskDetailComponent
      ),
  },
  {
    path: 'add/task',
    loadComponent: () =>
      import('./components/task-add/task-add.component').then(
        (m) => m.TaskAddComponent
      ),
  },
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'task',
    pathMatch: 'full',
  },
];
