import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ITask } from '../../../services/task.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class TaskComponent {
  task = input.required<ITask>();
  showDetails = output<string>();
  delete = output<string>();

  onShowDetails(): void {
    this.showDetails.emit(this.task().id);
  }

  onDelete(): void {
    this.delete.emit(this.task().id);
  }
}
