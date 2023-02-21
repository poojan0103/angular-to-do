import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { todoObj } from '../interface/todo';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoList: todoObj [];
todoObj: any;
constructor( private toastr: ToastrService,private router:Router) { 
  this.todoList = []
}

ngOnInit(): void {
  const records = localStorage.getItem('todoList');
  if(records !== null){
    this.todoList = JSON.parse(records);
  }
}

onoptionSelect(Id:any,val:String){
  let oldRecords = localStorage.getItem('todoList')
 let myarr;
  if(oldRecords !== null){
    myarr = JSON.parse(oldRecords);
  }
  //debugger;
  const data = myarr.filter((item: { Id: any; })=> item.Id == Id)[0];
  data.Status = val;
  localStorage.setItem('todoList',JSON.stringify(myarr));
  this.toastr.success('Status Updated!!', undefined, {
    'positionClass': 'toast-top-center'
});
  // this.router.navigate(['list']);
  //debugger;
}

delete(id:any){
  let result = confirm("Are you sure to delete this item");
  const oldRecords =this.getTodoList()
  if(result){
    oldRecords.splice(oldRecords.findIndex((a:any)=> a.Id == id),1)
    localStorage.setItem('todoList',JSON.stringify(oldRecords))
    this.toastr.error('Task Delete!!', undefined, {
            'positionClass': 'toast-top-center'
       });
 
}
  


  const records = localStorage.getItem('todoList');
  if(records !== null){
    this.todoList = JSON.parse(records)
  }


  }
  setId(id:any){
    localStorage.setItem('Id',JSON.stringify(id))
    this.router.navigate(['update'])
  }
  getTodoList () {
    const oldRecords  = localStorage.getItem('todoList');
    if (oldRecords && Object.keys(oldRecords).length) {
      return JSON.parse(oldRecords);
    }

    return [];
  }
}


