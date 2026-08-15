import { TaskStatus } from "./task-status";

export interface Task {
    id:number,
    taskName:string,
    priority:string,
    status:TaskStatus
}
