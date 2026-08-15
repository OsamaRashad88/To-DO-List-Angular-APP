import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { Task } from '../../task';
import { TodoList } from "../todo-list/todo-list";
import { TaskStatus } from '../../task-status';
@Component({
  selector: 'app-to-do-app',
  imports: [MatFormField, MatInputModule, FormsModule, MatSelectModule, MatIconModule, TodoList],
  templateUrl: './to-do-app.html',
})
export class ToDoApp implements OnInit{
taskName=''
priority=signal('Low')
id=1
allTasksList=signal<Task[]>([])

constructor(){
  effect(()=>{
    localStorage.setItem('sotredTaskList',JSON.stringify(this.allTasksList()))
  })
}
ngOnInit(): void {
 const savedTasks= localStorage.getItem('sotredTaskList')
 if (savedTasks) {
  this.allTasksList.set(JSON.parse(savedTasks));
  if(this.allTasksList().length > 0){
      this.id=Math.max(...this.allTasksList().map(task=>task.id))+1

  }
}

}
addTask(){
const newTask:Task={
id:this.id++,
taskName:this.taskName,
priority:this.priority(),
status:TaskStatus.ACTIVE
}
  this.allTasksList.update(tasks=>[...tasks,newTask])
  this.taskName=''
  console.log(this.allTasksList())
}

deleteTask(id:number){
   this.allTasksList.update(tasks =>
    tasks.filter(task => task.id !== id)
  );
}
toggleStatus(id:number){
  this.allTasksList.update(tasks=>tasks.map(task=>task.id==id?{...task,status:task.status===TaskStatus.DONE?TaskStatus.ACTIVE:TaskStatus.DONE}:task))
}

}