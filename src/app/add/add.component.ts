
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
  date : any;
  datepipe : any;
  todaydate : any;
  todolist:any;
  todoObj : todoObj;
  savebutton : boolean = true;
  updatebutton : boolean = false;

  
  constructor(private router:Router, private route:ActivatedRoute, private toastr: ToastrService) { 
    this.date = Date.now();
    this.datepipe = new DatePipe('en-US');
    this.todaydate = this.datepipe.transform(this.date,'yyyy-MM-dd');
    this.todoObj = new todoObj();
    this.route.params.subscribe((res)=>{
      this.todoObj.Id = res['id']
      this.checkId()
    
    
    })
  }

  ngOnInit(): void {
    
  }


  getId(){
    return this.getTodoList().length + 1;
  }
  saveItem(){
    this.savebutton = false;
    this.updatebutton = true;

    const latestId = this.getId();
    this.todoObj.Id = latestId;
    const oldRecords = this.getTodoList();
    
    oldRecords.push(this.todoObj);
    localStorage.setItem('todoList',JSON.stringify(oldRecords))
    this.toastr.success('Task Added!!', undefined, {
          'positionClass': 'toast-top-center'
    });
   
    this.router.navigateByUrl('/list')
  }
  checkId(){
    let id = localStorage.getItem('Id');
    if(id != null){
      this.getTask(JSON.parse(id))
    }
  }

  getTask(id:number){
    this.savebutton = false;
    this.updatebutton = true;
    let data = localStorage.getItem('todoList');

    if(data === null){
      this.todolist = [];
    }else{

      this.todolist = JSON.parse(data);
    }
  //  debugger 
    const temp = this.todolist.filter((item : any)=>item.Id === id)[0]
    this.todoObj.Title = temp.Title;
    this.todoObj.Description = temp.Description;
    this.todoObj.Startdate = temp.Startdate;
    this.todoObj.Enddate = temp.Enddate;
    this.todoObj.Status = temp.Status;
    
    
  }
  updateItem(){

    let id = localStorage.getItem('Id');
    let taskId : number;
    if(id !=null){
      taskId = JSON.parse(id);
    }
    
    // debugger
    const data = this.todolist.filter((item :any)=>item.Id === taskId)[0]
    data.Title = this.todoObj.Title ;
    data.Description = this.todoObj.Description; 
    data.Startdate = this.todoObj.Startdate ;
    data.Enddate  = this.todoObj.Enddate ;
    data.Status  = this.todoObj.Status ;
    localStorage.setItem('todoList',JSON.stringify(this.todolist));
    localStorage.removeItem('Id');
    this.toastr.success('Task Updated!!', undefined, {
            'positionClass': 'toast-top-center'
       });
    this.router.navigate(['list'])
    
   
  

  }


  getTodoList () {
    const todoList = localStorage.getItem('todoList');
    if (todoList && Object.keys(todoList).length) {
      return JSON.parse(todoList);
    }

    return [];
  }
}
