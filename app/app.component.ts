import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>My First Angular 2 App</h1>
    <pies></pies> <!--from pies-list.component.ts-->
    <task-list
      [childTaskList]="masterTaskList"
      (clickSender)="showDetails($event)"
    ></task-list> <!--from task-list.component.ts & also add trigger method call clickSender-->
    <div *ngFor="let currentTask of tasks">
      <h3>{{ currentTask.description }}</h3>
      <button (click)="showDetails(currentTask)">Edit</button>
    </div>
    <edit-task
      [childSelectedTask]="selectedTask"
      (doneClickedSender)="finishedEditing()"
    ></edit-task>
    <new-task
      (newTaskSender)="addTask($event)"
    ><new-task><!--from new-task.component.ts & also add trigger method called addTask that we'll declare next. addTask method's job will be to add the task to the array sending a task object along our newTaskSender bridge, we use the $event keyword to signify that our addTask method will be receiving an argument.-->
  </div>

  `
})

export class AppComponent {
  public masterTaskList: Task[] = [
    new Task("Create To-Do List app.", 0),
    new Task("Learn Kung Fu.", 1),
    new Task("Take kids to swim.", 2),
    new Task("Do Laundry.", 3)
    /**Create a public property called task of type Task(the name of our Model class). We used the new keyword to instantiate a new Task with the description "Create To-Do List app." and an id of 0 --We changed public task: Task; property into an array of Task objects called tasks. Then we display them in our template by creating a loop using the directive *ngFor which built into Angular They are speical keywords that you can use as attributes in HTML we now store data w/a model, store instances of that Model in a component, and display the data in a View by using the Controller Class(also called the Component Class).
    */
  ];
  selectedTask: Task = null;
  showDetails(clickedTask: Task) {
    this.selectedTask = clickedTask;
  }
  finishedEditing() {
    this.selectedTask = null;
  }
  //Declare addTask
  addTask(newTaskFromChild: Task) {
    this.masterTaskList.push(newTaskFromChild);
  }//we use push method to add new task object to our masterTaskList.
  //now let's go to new-task.components and clear the form after we submit it. We can do that usingour local variables in our New Task Component.
}
