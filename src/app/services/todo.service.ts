import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';
  constructor(private http: HttpClient) {}
  //get todos
  getTodos(): Observable<Todo[]> {
    //similar to axios
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  //Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
  //Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    //const url = `${this.todosUrl}/${todo.id}`;
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  //toggle completed
  toggleCompleted(todo: Todo): Observable<any> {
    //build url for put request, add todo.id in url
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
