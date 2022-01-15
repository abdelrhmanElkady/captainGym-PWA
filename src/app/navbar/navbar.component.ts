import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ TranslateService}from '@ngx-translate/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,public translate:TranslateService) {
    //for translation
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
  }

  ngOnInit(): void {
  }
  switchLang(event: any) {
    this.translate.use(event.target.value);
  }

  logout(){
    this.router.navigate(['/login'])
    localStorage.setItem('gymLogin',"false")
  }

  
}
