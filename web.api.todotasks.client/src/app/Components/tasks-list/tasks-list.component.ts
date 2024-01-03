import { Component, Input } from '@angular/core';
import { Task } from '../../Common/Models/task.model';
import { ApiConnectionService } from '../../Services/api-connection.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})

//task list comp show all the user task with option to edit fields and create or delete task
export class TasksListComponent {
  @Input() set taskList(value: Task[]) {
    //when input update local list
    this.localTaskList = value;
  }
  @Input() userId!: string;

  localTaskList: Task[] = [];

  constructor(private apiService: ApiConnectionService) {
  }

  //craete new task: add item to local list and post server
  createNewTask() {
    const task: Task = new Task('');
    task.userName = this.userId;
    this.localTaskList.push(task);
    this.apiService.createTask(task);
  }

  //update task: update local list and put server
  updateTask(item: Task, dataToSave: any) {
    const index = this.localTaskList.findIndex(el => el.id === item.id);

    //check if taskId exist in the local list
    if (index > -1) {
      this.localTaskList[index].title = dataToSave.title;
      this.localTaskList[index].executionDate = dataToSave.executionDate;
      this.localTaskList[index].details = dataToSave.details;
      this.localTaskList[index].userName = this.userId;
       this.apiService.updateTask(this.localTaskList[index]);
    }
  }

  //delete task: delete from local list and delete req to server
  deleteTask(taskId: string) {
    const index = this.localTaskList.findIndex(el => el.id === taskId);

    //check if taskId exist in the local list
    if (index > -1) {
      this.localTaskList.splice(index, 1);
    }

    this.apiService.deleteTask(this.userId, taskId);
  }

  changeOpen(item: Task, isOpen: boolean) {
    item.isOpen = isOpen;
  }
}
