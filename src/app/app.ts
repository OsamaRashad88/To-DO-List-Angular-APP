import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoApp } from "./to-do-app/to-do-app";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoApp],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('TODO-app');
}
