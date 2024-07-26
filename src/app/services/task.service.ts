import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface ITask extends ITaskId, ITaskBase {}

interface ITaskId {
  id: string;
}

export interface ITaskBase {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _router = inject(Router);
  private _tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<
    ITask[]
  >([]);

  getTasks(): Observable<ITask[]> {
    return this._tasksSubject.asObservable();
  }

  getTaskById(id: string): Observable<ITask | undefined> {
    return this.getTasks().pipe(
      map((tasks) => tasks.find((task) => task.id === id))
    );
  }

  deleteTask(id: string): void {
    const currentTasks = this._tasksSubject.value;
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    this._tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  addTask(newTask: ITaskBase): void {
    const currentTasks = this._tasksSubject.value;
    const lastTaskId = currentTasks[currentTasks.length - 1].id;
    const newTaskWithId = { ...newTask, id: lastTaskId + 1 };
    const updatedTasks = [...currentTasks, newTaskWithId];
    this._tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
    this._router.navigate(['task']);
  }

  //
  //
  loadTasksFromLocalStorage(): void {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      this._tasksSubject.next(tasks);
    } catch (error) {
      this._tasksSubject.next([]);
    }
  }

  saveTasksToLocalStorage(tasks: ITask[]): void {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage', error);
    }
  }
}
