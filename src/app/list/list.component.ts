import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { todoObj } from '../interface/todo';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoList: todoObj [];
todoObj: any;
  constructor( private toastr: ToastrService) { 
    this.todoList = []
  }

  ngOnInit(): void {
    const records = localStorage.getItem('todoList');
    if(records !== null){
      this.todoList = JSON.parse(records);
    }
  }
  delete(id:any){
    let result = confirm("Are you sure to delete this item");
    const oldRecords = localStorage.getItem('todoList');
    if(result){
    if(oldRecords !== null ){
      
      const todoList = JSON.parse(oldRecords);
      todoList.splice(todoList.findIndex((a:any)=> a.Id == id),1)
      localStorage.setItem('todoList',JSON.stringify(todoList))
      //this.toastr.error("Task Deleted Suceessfully!!","TODO")
      this.toastr.error('Task Delete!!', undefined, {
        'positionClass': 'toast-top-center'
   });
        }   }
    
  
  
    const records = localStorage.getItem('todoList');
    if(records !== null){
      this.todoList = JSON.parse(records)
    }

  }

}
