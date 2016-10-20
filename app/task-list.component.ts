import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  template: `
  <div *ngFor="let currentTask of childTaskList"> <!--Instead of tasks since that change to childTaskList below -->
    <h3>{{ currentTask.description }}</h3>
    <button (click)="editButtonHasBeenClicked(currentTask)">Edit</button>
  </div>

  `
})

export class TaskListComponent {
  // public tasks: Task[] = [
  //   new Task("Create To-Do List app.", 0),
  //
  //   new Task("Learn Kung Fu.", 1),
  //   new Task("Take kids to swim.", 2),
  //   new Task("Do Laundry.", 3)
  //since we put these in app.component.t w/MasterTask instead now we need to write reference
  @Input() childTaskList: Task[];
  @Output() clickSender = new EventEmitter();
//@Input is a decorator the same as @Component but simpler.
  editButtonHasBeenClicked(taskToEdit: Task) {
    this.clickSender.emit(taskToEdit);
  }
}
