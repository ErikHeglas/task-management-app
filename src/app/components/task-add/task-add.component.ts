import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITaskBase, TaskService } from '../../services/task.service';

@Component({
  selector: 'task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class TaskAddComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  taskForm: FormGroup = this._formBuilder.group({
    taskTitle: ['', Validators.required],
    taskDescription: ['', Validators.required],
  });

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: ITaskBase = {
        title: this.taskForm.value.taskTitle,
        description: this.taskForm.value.taskDescription,
      };
      this._taskService.addTask(newTask);
    } else {
      console.error('Form is invalid!');
    }
  }
}
