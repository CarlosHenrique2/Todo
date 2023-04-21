import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tasks } from 'src/app/interfaces/interfaces';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnChanges  {

  @Input() tasks: tasks[] = [];
  displayedColumns: string[] = [ 'concluido', 'titulo', 'descrição', 'data de vencimento', 'prioridade', 'ações'];
  dataSource: tasks[] = [];

  constructor(
    public dialog: MatDialog,
    private taskservice: TaskService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tasks']) {
      this.updateList() 
    }
  }

  public openDialog(tasks: any[]): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {task: this.tasks = tasks}
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateList();
        }
      }
    })
  }

  public updateList() {
    this.taskservice.getAllTaks().subscribe(tasks => {
    localStorage.setItem("Tarefas", JSON.stringify(tasks))
    console.log(tasks)
  })    
  
  const tarefas: any = localStorage.getItem("Tarefas")
  this.dataSource = JSON.parse(tarefas) 
  }
  

  public deletTask(id: any): void{
    this.taskservice.deletTask(id).subscribe((task) => {
      localStorage.removeItem(id)
    })
  }


}
