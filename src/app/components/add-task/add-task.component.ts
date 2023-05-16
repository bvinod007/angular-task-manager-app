import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() addTaskEmitter: EventEmitter<Task> = new EventEmitter()
  text!: string;
  day!: string;
  reminder!: boolean;
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  onSubmit() {
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    if (!newTask.text) {
      alert('Please enter a Task')
      return
    }

    this.addTaskEmitter.emit(newTask)

    this.text = ''
    this.day = ''
    this.reminder = false
  }

}
