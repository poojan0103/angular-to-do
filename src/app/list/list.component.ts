import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { todoObj } from '../interface/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoList: todoObj [];
  constructor() { 
    this.todoList = []
  }

  ngOnInit(): void {
    const records = localStorage.getItem('todoList');
    if(records !== null){
      this.todoList = JSON.parse(records);
    }
  }
  delete(id:any){
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      todoList.splice(todoList.findIndex((a:any)=> a.Id == id),1)
      localStorage.setItem('todoList',JSON.stringify(todoList))
      
    }
    const records = localStorage.getItem('todoList');
    if(records !== null){
      this.todoList = JSON.parse(records)
    }

  }

}
