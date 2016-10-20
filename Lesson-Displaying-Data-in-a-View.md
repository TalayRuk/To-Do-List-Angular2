words-describing-purpose.component.ts = file naming convention
When create new @Component file
- We need to tell app.module.ts that the new template exists.
- By adding import { PiesListComponent }
1. Then task-list.component.ts
2. start w/app.component.ts
3. task.model.ts
4. app.module.ts
  - add import { TaskListComponent } from './task-list.component'
  - add TaskListComponent at declarations
  - the edit btn won't work at this point b/c our task are needed in 2 places. We want it in task-list.component & appcomponent so we can edit them & keep the logic there.
5. Restructure component tree.

## Data down, action up: a programing pattern  
- **All of our data lives at the top of our component tree & we pass whatever bits the child components need downwards. Child components can load other child components & pass them the information they need, and on and on. However, actions will start at the bottom of the tree & notify the top of the tree whenever data needs to be changed & the display will react accordingly.**

6. Move dat back up. In app component class declaration we are going to add the array of tasks back in, renaming it masterTaskList for clarity

7. In child component, the task list component, we will create an input. A task list component's job is to display our task list, so it needs to receive a list of tasks to be able to do its job properly. We do this w/a new decorator called the _@Input_ decorator. It's a similar syntax to the @Component decorator, but simpler. We add it to our list of imports at the top , & then change what used to be our tasks property to be of type @Input. We'll rename it childTaskList for clarity. We haved also changed our _*ngFor loop to use the new variable name childTaskList too
import { Component, Input } from '@angular/core';_
  - add @Input() childTaskList: Task[]; to export class at task-list.component.ts

8. Now we need to pass as action back up: once the task's edit button is clicked, app component need to display edit form for the selected task. We do this with a _custom event emitter_.
  - We already used built in event emitters when we attached the click handler to our edit button. The custom event emitter, is the same idea, but it's used to make 2 components talk to each other.
  - Start at the child component to notify the parent component when we have clicked the edit button, and it needs to tell the parent component which task has been clicked.
  - Add (Component, Input, Output, EventEmitter) to import at task-list.component.ts
  - Add @Output() clickSender = new EventEmitter(); to export class
  - Also change the name of the edit button's click method to editButtonHasBeenClicked for clarity.
  - The same way that we created a holder for our list of tasks by using the @Input decorator, we create a new property in our class for our output events to travel on by using the @Output decorator. It's a new instance of the _EventEmitter_ class, and we name this property _clickSender_.
  - Think of this event emitter property as a bridge. By saying outputs: @Output() clickSender = new EventEmitter();. We are telling Angular that we are going to bridge from this component to another component. Put up a sign labelled clickSender, & build the bridge!
  - Now we need to send task objects across the bridge & we just need to tell them to go when we click the edit button. We do this by calling the emit method on our clickSender object in our editButtonHasBeenClicked method.

9. Once we click a task's edit button, we trigger the editButtonHasBeenClicked method, passing in the current task as an argument. It pops out inside the method w/in the taskToEdit parameter. Then it sent across the clickSender bridge by calling its emit method, and passing taskToEdit as an argument.

10. We need to tell the parent component to expect this event, and connect it to the existing showDetails method we have leftover in our parent component. We need to modify the way that we are instantiating the child component in the parent template.
  - add <task-list
      [childTaskList]="masterTaskList"
      (clickSender)="showDetails($event)"></task-list> at app.component.ts html part

11. We used [] to signify an input - the child component's job here is to display a list of tasks. It can't do that job unless we pass in an _array_ of tasks to display

12. We use () to signify that we are expecting an output from the child component - it'll emit an event when an edit button has been clicked. The $event is what will hold our clicked task.
  - There're 2 rules w/custom event listeners:
    1. We're only allowed to send 1 piece of data at a time: it is a 1 lane event emitter bridge. If we need multiple pieces of data, we need to store them in an array, or as key-value pairs in an object.
    2. What we send along the event emitter bridge pops out in the parent component inside that $event variable.

13. Separate out the **EDIT TASKS COMPONENT**
    - Let's refractor edit tasks component. The form for editing a component can be encapsulated in its own file.
    - **The app component's job is to load other components.**
    - Create EditTAskComponent will include the HTML for edit form as its template, it'll need to know which task we are editing, & it'll need to communicate the new information back up to the app component.
    - We'll import Task, Component, Input, Output, and EventEmitter & copy our form over to the new component we just created.
    - Add EditTAskComponent to app.module.ts
    - Add <edit-task></edit-task> to app.component.ts file
    - add variable selectedTask to edit-task.component.ts in order to show/ hide the form, as well as edit the properties of the object. So we'll have to pass the selected task in as an input from the parent.
      1. We'll use @Input decorator to create the selectedTask property in our EditTAskComponent, just as we defined the childTaskList in our task-list.component.
      2. We're defining the receiver so that afterwards we can pass in whatever need from the parent component - in case we'll need to pass in other task we click on.
      3. Let's rename this property from selectedTask to childSelectedTask for clarity, just as we did w/the TaskListComponent, and we'll change it everywhere in the template as well.
        - We pass it down from the parent , and we can edit it in the child component.

    - Recap: We moved it into its own component. The we connected up an input so that it'd receive the data it needs from its parent. Now ... Will we have output to connect?
    - "Done button isn't working" so yes... we need to have output. Thus, the EditTAskComponent needs to perform an action when the "done" button is clicked.

    - Back to _data down & actions up_ So we can reason logically that we probably need to send some kind of action back up as an output to the parent component when our "Done" button is clicked.
    - Right now, it's only triggering the finishedEditing method, which still lives in the parent component. Let's make it trigger a new method called _doneClicked_. This method can trigger an event emitter to tell our parent component to run the finishedEditing method. fany information this parent method required, we could pass that along as an argument. However, this method only is responsible for setting selectedTask back to null when we are finished editing, so all we need to do is tell it to "go!".
    - We still need to build a bridge btwn the 2 components so that they can talk. We'll define @Output, (event emitter/our bridge) Then, we call a method(doneClicked) to emit our event at the correct time.    
    - Now we can connect that output event up to our parent method, finishedEditing by using this line in our <edit-task> selector: (doneClickedSender)="finishedEditing()"
    - The child component is on the left side of the equal sign & the current component, the parent component, is on the right. _We use parenthesis instead of square breackets around (doneClickedSender) to show an output from the child._  




@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>My First Angular 2 App</h1>
    <h3>One of my favorite bands is: {{ favoriteBand }}</h3>
  <!-- We telling Angular that anything in {{}} to show its value-->
    <p>If I had to choose a favorite painter it would be: {{ favoritePainter }}</p>
    <p>The number of slices of pie I would like is: {{ slicesOfPie }}</p>
    <h3>One of my favorite Albums is: </h3>
    <p>{{ favoriteAlbum.title }}</p>
    <p>By {{ favoriteAlbum.artist }}</p>
    <p>Released in {{ favoriteAlbum.released }}</p>
    <h3>Here are my favorite pies!</h3>
    <div class="pie" *ngFor="letcurrentPie of favoritePies">
      <!--use directive to loop, we can also use this to display a list of our objects-->
      <p>{{ currentPie }}</p>
    </div>
    <h3>Here are my favorite albums</h3>
    <div class="album" *ngFor="let album of albums">
      <p>{{ album.title }}</p>
      <p>By {{ album.artis }}</p>
      <p>Released in {{ album.released }}</p>
    </div>
  </div>
  `
})

export class AppComponent {
  favoriteBand: string = 'RadioHead';
  favoritePainter: string = 'Jason';
  slicesOfPie: number = 2;
  favoriteAlbum: Album = new Album("Disintergration", "The Cure", 1989)
  /** //this is how to comment in Typscript
  <!-- Create new; class Album using export so it can be access by other files--> */
  favoritePies: string[] = ["Apple", "Banana Cream", "Blackberry"];
  albums: Album[] = [
    new Album("Pulse", "Pink Floyd", 1995),
    new Album("Sound", "Sound Gardern", 1996),
    new Album("My way", "DinosaurJr.", 1994)
  ];
}

export class Album {
  constructor (public title: string, public artist: string, public released: number) { }
}

(click)="doStuff()" = called output binding to the tag emitting the click event that we want
