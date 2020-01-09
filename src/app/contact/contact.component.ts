import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { IStatus } from '../Interface/iStatus'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  url:string = "http://rohanmorris.com/ng_contact.php";
  messageForm: FormGroup;
  submitted:boolean = false;
  success:boolean   = false;
  error:boolean     = false;
  res:IStatus;
  style:string;
  message:string;
  btnDisable:boolean = false;

  constructor(private http:HttpClient, private formBuilder:FormBuilder) { 
    this.messageForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        subject: ['', Validators.required],
        comments: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.messageForm.invalid){
      this.error = true;
      return;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      name:     this.messageForm.controls.name.value,
      email:    this.messageForm.controls.email.value,
      subject:  this.messageForm.controls.subject.value,
      message:  this.messageForm.controls.comments.value,
    }; 

    this.btnDisable = true;
    this.http.post<IStatus>(this.url, body, {headers, responseType:"json"})
    .subscribe(data => {
      this.style =  (data.status=="ok") ? "alert-success" : "alert-danger";
      this.btnDisable =  (data.status=="ok") ? true : false;
      this.message = data.message;

      console.log(data.status);
    });

    this.error = false;
    this.success = true;
  }

  ngOnInit() {
  }

}