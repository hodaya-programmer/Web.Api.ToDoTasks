import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../Common/Models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
//task form comp apear all the task's fiels and update values
export class TaskFormComponent {

  @Input() set data(value: Task) {
    //update input data to form
    this.contactForm.controls['title'].setValue(value.title);
    this.contactForm.controls['details'].setValue(value.details);
    this.contactForm.controls['executionDate'].setValue(value.executionDate);
  };
  @Output() onChange = new EventEmitter<Task>();

  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  //create new form
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      title: [''],
      details: [''],
      executionDate: ['']
    });
  }

  //for update task field
    onSubmit() {
      this.onChange.emit(this.contactForm.value);
  }
}
