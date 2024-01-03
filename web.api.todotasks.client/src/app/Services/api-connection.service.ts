import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Common/Models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//service before all http calls
export class ApiConnectionService {

  //observer for async state
  public taskList$: Subject<Task[]> = new Subject<Task[]>();
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
  }


  public getUserTaskList(user: string) {
   //set user name in header
    this.headers = this.headers.set('UserName', user);
    this.http.get<Task[]>('/ToDoTasks/GetUserTasksList', { 'headers': this.headers }).subscribe(
      (result) => {
        //updte result in the subject
        this.taskList$.next(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public createTask(data: Task) {
    this.http.post('/ToDoTasks/CreateTask', data).subscribe(
      (result) => {
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public updateTask(data: Task) {
    //For Fix bug that item return from server in the open state
    data.isOpen = false;
    this.http.put('/ToDoTasks/UpdateTask', data, { 'headers': this.headers }).subscribe(
    (result) => {
    },
    (error) => {
      console.error(error);
    }
  );
} 
  
  public deleteTask(user: string, id: string)
  {
    //set user name and task id in header
    this.headers = this.headers.set('TaskId', id);
    this.headers = this.headers.set('UserName', user);

    this.http.delete('/ToDoTasks/DeleteTask', { 'headers': this.headers }).subscribe(
      (result) => {
      },
      (error) => {
        console.error(error);
      }
    );
}
}
