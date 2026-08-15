import { Task } from './../../task';
import { Component, computed, EventEmitter, input, output, signal } from '@angular/core';
import { TaskStatus } from '../../task-status';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { NgTemplateOutlet, NgClass } from '@angular/common';
@Component({
  selector: 'app-todo-list',
  imports: [MatTabsModule, NgTemplateOutlet, NgClass],
  templateUrl: './todo-list.html',
})
export class TodoList {
    status=TaskStatus
List=input<Task[]>([])
  deleteEvent = output<number>();
    toggleStatusEvent = output<number>();

  selectedStatus = signal<TaskStatus>(TaskStatus.All);
    filteredList = computed(() => {
    if (this.selectedStatus() === TaskStatus.All) {
      return this.List();
    }

    return this.List().filter(
      task => task.status === this.selectedStatus()
    );
  });

  deleteTask(id:number){
    this.deleteEvent.emit(id)
  }
toggleStatus(id:number){
  this.toggleStatusEvent.emit(id)
}
  filterTAsks(status:MatTabChangeEvent){
    this.selectedStatus.set(status.tab.textLabel as TaskStatus)
  }
  allCount = computed(() => this.List().length);

activeCount = computed(() =>
  this.List().filter(task => task.status === TaskStatus.ACTIVE).length
);

doneCount = computed(() =>
  this.List().filter(task => task.status === TaskStatus.DONE).length
);
}