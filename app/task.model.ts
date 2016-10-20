/** moved from app.component.ts*/
export class Task {
  public done: boolean = false;
  /**
  <!--make a constructor Just like our Album class & our appcomponent class, we use the export keyword when defining our Model class. This will make it available to other files later. The Task obj has 3 properties done, description, and id.-->
  */
  constructor(public description: string, public id: number) { }
}
