import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Trainee } from '../trainee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  traineeObj: Trainee = new Trainee();
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  
  login() {
    let admin: {email:string,password:string} =JSON.parse(localStorage.getItem('adminLogin') || '[]') ;
    if(admin.email === this.loginForm.value.email &&
      admin.password === this.loginForm.value.password){
        localStorage.setItem('gymLogin', 'true');
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }else {
        alert('user not found');
    }
  }
}
