import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>My First Angular 2 App</h1>
    <div *ngFor="let currentTask of tasks">
      <h3>{{ currentTask.description }}</h3>
      <button (click)="showDetails(currentTask)">Edit</button>

    </div>
    <h1>Edit Task</h1>
    <div>
      <label>Enter Task Description: </label>
      <input [(ngModel)]="selectedTask.description">
    </div>
    <div>
      <label>Enter Task ID: </label>
      <input [(ngModel)]="selectedTask.id">
      <button (click)="finishedEditing()">Done</button>
    </div>
  </div>
  `
})


export class AppComponent {
  public tasks: Task[] = [
    new Task("Create To-Do List app.", 0),
    /**Create a public property called task of type Task(the name of our Model class). We used the new keyword to instantiate a new Task with the description "Create To-Do List app." and an id of 0 --We changed public task: Task; property into an array of Task objects called tasks. Then we display them in our template by creating a loop using the directive *ngFor which built into Angular They are speical keywords that you can use as attributes in HTML we now store data w/a model, store instances of that Model in a component, and display the data in a View by using the Controller Class(also called the Component Class).
    */
    new Task("Learn Kung Fu.", 1),
    new Task("Take kids to swim.", 2),
    new Task("Do Laundry.", 3)
  ];
  selectedTask: Task = this.tasks[0];
  showDetails(clickedTask: Task) {
    this.selectedTask = clickedTask;
  }
  finishedEditing() {

  }
}

/** start here first */
export class Task {
  public done: boolean = false;
  /**
  <!--make a constructor Just like our Album class & our appcomponent class, we use the export keyword when defining our Model class. This will make it available to other files later. The Task obj has 3 properties done, description, and id.-->
  */
  constructor(public description: string, public id: number) { }
}
