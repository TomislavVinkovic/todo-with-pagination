import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from '../models/todo';
import { Environment } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  BASE_ENDPOINT = Environment.BASE_URL + '/todos';

  constructor(
    private http: HttpClient
  ) { }

  getTodos(pagination: {
    page: number,
    perPage: number
  }) {
    return this.http.get(this.BASE_ENDPOINT + `?perpage=${pagination.perPage}&page=${pagination.page}`).pipe(
      map((result: any) => {
        return {
          meta: result.meta,
          todos: result.todos.map((todo: any) => new Todo(todo))
        }
      })
    )
  }

  createTodo(todo: Todo) {
    return this.http.post(this.BASE_ENDPOINT, {todo}).pipe(
      map((result: any) => {
        return {
          todo: new Todo(result)
        }
      })
    )
  }

  updateTodo(todo: Todo) {
    return this.http.put(this.BASE_ENDPOINT + `/${todo.id}`, {todo}).pipe(
      map((result: any) => {
        return {
          todo: new Todo(result)
        }
      })
    )
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(this.BASE_ENDPOINT + `/${todo.id}`).pipe(
      map((result: any) => {
        return {
          todo: new Todo(result)
        }
      })
    );
  }
}
