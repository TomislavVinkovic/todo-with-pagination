import { Component, Inject, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../models/todo';
import { TodoService } from '../todo-service/todo.service';

@Component({
  selector: 'app-create-update-todo-form',
  templateUrl: './create-update-todo-form.component.html',
  styleUrls: ['./create-update-todo-form.component.scss']
})
export class CreateUpdateTodoFormComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data?: {todo?: Todo}
  ){}

  dialogRef = inject(MatDialogRef<CreateUpdateTodoFormComponent>);
  todoService = inject(TodoService);
  
  id = signal(this.data && this.data.todo ? this.data.todo.id : undefined);
  title = signal(this.data && this.data.todo ? this.data.todo.title : '');
  date = signal(this.data && this.data.todo ? this.data.todo.date : '');
  isCompleted = signal(this.data && this.data.todo ? this.data.todo.done : false);

  onCancel(){
    this.dialogRef.close();
  }
  onSave(){
    const todo = new Todo({
      id: this.id(),
      title: this.title(),
      date: this.date(),
      done: this.isCompleted()
    });
    const action = this.id() ? this.todoService.updateTodo(todo) : this.todoService.createTodo(todo);
    
    action.subscribe({
      next: (data) => {
        this.dialogRef.close(data.todo);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
