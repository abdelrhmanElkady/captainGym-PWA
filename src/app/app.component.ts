import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Trainee } from './trainee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'captain-gym';

  constructor(){}
  ngOnInit(): void {
    localStorage.setItem('adminLogin', JSON.stringify({email:"bignasef@captaingym.com",password:"bignasefbignasef"}));
  }

  

}
