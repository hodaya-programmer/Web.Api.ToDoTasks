import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksListComponent } from './Components/tasks-list/tasks-list.component';
import { UserFormComponent } from './Components/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TasksListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
