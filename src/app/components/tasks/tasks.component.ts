import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/Task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  @Input() tasks: Task[] = []

  constructor(private taskService: TasksService) {

  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter((t) =>  t.id !== task.id) )
  }

  toggleReminder(task: Task) {
    this.taskService.toggleReminder(task).subscribe()
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe(() => this.tasks.push(task))
  }
}
