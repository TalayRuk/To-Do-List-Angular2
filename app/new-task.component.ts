import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'new-task',
  template: `
  <div *ngFor="NewTaskComponent">
    <h1>New Task: </h1>
    <div>
      <label>Enter Task Description: </label>
      <input #newDescription>
      <!--created local variable to hold its HTML input tag-->
    </div>
    <div>
      <label>Enter Task ID:</label>
      <input #newId>
    <button (click)="addClicked(newDescription.value, newId.value);
      newDescription.value='';
      newId.value='';
    ">Add New Task</button>
    <!-- get values typed into each field from newDescription.value, newId.value & attch them to a click handler to the form's button next to trigger a method to add the new task, this will pass each input field's value into the method as an argument. ***Insert 2 commands inside of the double quotes on our button tag. It takes the form of (click)="doThing(); do AnotherThing(); setSomeVariable=3;" each command will run when there is a click event. We are setting both of the input values to blank strings. We break it down like below;
    <button
    (click)="
    methodToRun();
    anotherMethod();
    variable='thing';
    Then we close the quotes and the button tag:

    ">Text for button</button> -->
    </div>
  </div>

  `
})

export class NewTaskComponent {
  @Output() newTaskSender = new EventEmitter();
  addClicked(description: string, id: number) {
    var newTaskToAdd: Task = new Task(description, id);
    this.newTaskSender.emit(newTaskToAdd);
    //we have to send our newTaskToAdd up to App Component where we're keeping the rest of our tasks, and add it to the array where it can be displayed & edited by our other components. That means we need to create an output for it. Let's call it NewTaskSender. We'll emit the new task object when we click the add button in our addClicked method, right afterwe've created the object.
    //Why can't we just sending the description & id up to the App Component? B/c event emitters are 1 lane bridges.
    //We can only send 1 argument at a time, so if we have multiple pieces of information to send btwn components we have to either bundle them up in an object or an array. So, we should construct our new task object here & then send it. B/c NewTaskComponent job is to create new tasks.
    //Now we just need to connect the 2 components - so we need to tell the AppComponent to expect this new task output, & tell it what to do w/ the new task object. So in template where we load our new task componet, we use the parenthesis to signify that this child component will be sending an output called newTaskSender.
  }
}
