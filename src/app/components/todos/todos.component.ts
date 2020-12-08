import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  //shape of todos defined in app/models/todo
  todos: Todo[];

  //initialize services in constructor
  constructor(private todoService: TodoService) {}

  // life-cycle method, similar to componentDidMount in React
  ngOnInit() {
    // .subscibe() works similar to .then()
    // wtf are observables?
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    //remove from UI, filter => return all todos that don't have that id
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }
}
