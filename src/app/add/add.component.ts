// import { JsonPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { todoObj } from '../interface/todo';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  d : any;
  dpipe : any;
  today : any;
  todoObj : todoObj;
  savebutton : boolean = true;
  updatebutton : boolean = false;

  
  constructor(private router:Router, private route:ActivatedRoute, private toastr: ToastrService) { 
    this.d = Date.now();
    this.dpipe = new DatePipe('en-US');
    this.today = this.dpipe.transform(this.d,'yyyy-MM-dd');
    this.todoObj = new todoObj();
    this.route.params.subscribe((res)=>{
      this.todoObj.Id = res['id']
    // this.getData()
    
    })
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('todoList');
    let todoList;
    let current;
    if(oldRecords !== null){
      todoList= JSON.parse(oldRecords)
      //debugger;
      current = todoList.find((m:any)=> m.Id == this.todoObj.Id)
      if(current !== undefined){
        this.todoObj.Title = current.Title;
        this.todoObj.Description = current.Description;
        this.todoObj.Startdate = current.Startdate;
        this.todoObj.Enddate = current.Enddate;
        this.todoObj.Status = current.Status;
        this.savebutton = false;
        this.updatebutton = true;
        
        
      }
    }
  }

//   getData(){
//     const oldRecords = localStorage.getItem('todoList');
//     let todoList=[];
//     let current;
//     if(oldRecords !== null){
//       todoList= JSON.parse(oldRecords)
//       current = todoList.filter((m:any)=> m.Id == this.todoObj.Id)
//       if(current !== undefined){
//         this.todoObj.Title = current.Title;
//         this.todoObj.Description = current.Description;
//         this.todoObj.Startdate = current.Startdate;
//         this.todoObj.Enddate = current.Enddate;
//         this.todoObj.Status = current.Status;
//         this.savebutton = false;
//         this.updatebutton = true;
        
//   }
// }
//   }
  getId(){
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      return todoList.length+1;
    }else{
      return 1;
    }
    
  }
  saveItem(){
    this.savebutton = false;
    this.updatebutton = true;
    const latestId = this.getId();
    this.todoObj.Id = latestId;
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      todoList.push(this.todoObj);
      localStorage.setItem('todoList',JSON.stringify(todoList))
     // alert("Task is added")
    //  showErrorMessage(message: string) {
      this.toastr.success('Task Added!!', undefined, {
           'positionClass': 'toast-top-center'
      });
    //
    // this.toastr.toastrConfig.positionClass = 'toast-top-center'
    //  this.toastr.success('Task added suceessfully!!','TODO')
    
    }else{
      const todoArr = [];
      todoArr.push(this.todoObj);
      localStorage.setItem('todoList',JSON.stringify(todoArr))
    }
    this.router.navigateByUrl('/list')
  }
  updateItem(){
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      todoList.splice(todoList.findIndex((a:any)=> a.Id == this.todoObj.Id),1)
      todoList.push(this.todoObj);
      localStorage.setItem('todoList',JSON.stringify(todoList));
      this.toastr.success('Task Updated!!', undefined, {
        'positionClass': 'toast-top-center'
   });
    }
    this.router.navigateByUrl('/list')

  }


 }
//   function showErrorMessage(message: any, string: any) {
//     throw new Error('Function not implemented.');
//   }
