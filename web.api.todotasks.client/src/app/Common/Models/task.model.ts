import { Data } from "@angular/router";
import { UUID } from "angular2-uuid";
export class Task {
  constructor(title: string, details: string = '', executeDate: Date | undefined = undefined) {
    //generate guid
    this.id = UUID.UUID();
    this.title = title
    this.details = details;
    this.executionDate = executeDate;
  }
  id: string;
  title: string = '';
  details: string = '';
  executionDate: Date | undefined = undefined;
  isOpen: boolean = false;
  userName: string = '';
}
