import { Component } from '@angular/core';
import { ApiConnectionService } from '../../Services/api-connection.service';
import { Task } from '../../Common/Models/task.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

//user form comp - apear input for select user
export class UserFormComponent {

  //model of use id
  userId: string = '';

  //for show task list comp
  isShowtasksList: boolean = false

  //tasks for task list comp
  taskslist: Task[] = [];
  constructor(private apiService: ApiConnectionService) {
    //subscribe of get result from server
    this.apiService.taskList$.subscribe(value => {
      this.taskslist = value;
      //now show  task list comp
      this.isShowtasksList = true;
    });
  }

  //go to task-list
  createUser(user: string) {
    //if new user dont need to get request
    this.isShowtasksList = true;
  }

  //get from server user's tasks
  getUserTasks(user: string) {
    this.apiService.getUserTaskList(this.userId);
  }
}
