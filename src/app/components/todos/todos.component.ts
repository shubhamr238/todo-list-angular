import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    //delete in UI
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    //delete in devServerTarget
    this.todoService
      .deleteTodo(todo)
      .subscribe((todo) => console.log('Deleted, Returns Empty Object!'));
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe((todo) => {
      console.log(todo);
      this.todos.push(todo);
    });
  }
}
