import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Trainee } from './trainee.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  traineesArray: Trainee[] = JSON.parse(
    localStorage.getItem('traineesArray') || '[]'
  );
  constructor(private http: HttpClient) {}

  getTrainees(): Trainee[] {
    this.traineesArray= JSON.parse(
      localStorage.getItem('traineesArray') || '[]'
    );
    for (let i = 0; i < this.traineesArray.length; i++) {
      let today: Date = new Date();
      let endDate: Date = new Date(this.traineesArray[i].endDate);
      if (today >= endDate) {
        this.traineesArray[i].expired = true;
      } else {
        this.traineesArray[i].expired = false;
      }
    }
    return this.traineesArray;
  }

  postTrainee(trainee: Trainee) {
    this.traineesArray= JSON.parse(
      localStorage.getItem('traineesArray') || '[]'
    );
    // console.log("trainees before adding"+JSON.stringify(this.traineesArray))
    this.traineesArray.push(trainee);
    // console.log("trainees after adding"+JSON.stringify(this.traineesArray))
    localStorage.setItem('traineesArray', JSON.stringify(this.traineesArray));
  }

  deleteTrainee(trainee:Trainee) {
    
    // return this.http.delete(
    //   `https://captain-gym-default-rtdb.europe-west1.firebasedatabase.app/trainees/${id}.json`
    // );
    this.traineesArray.splice(this.traineesArray.indexOf(trainee),1)
    localStorage.setItem('traineesArray', JSON.stringify(this.traineesArray));
  }

  editTrainee(id: string, trainee: Trainee) {
    // return this.http.put(
    //   `https://captain-gym-default-rtdb.europe-west1.firebasedatabase.app/trainees/${id}.json`,
    //   trainee
    // );

    // var index = this.traineesArray.indexOf(trainee);
   
    for (let i = 0; i < this.traineesArray.length; i++) {
      if(this.traineesArray[i].id == id){
        this.traineesArray[i] = trainee;
        break;
      }
    }
    localStorage.setItem('traineesArray', JSON.stringify(this.traineesArray));
  }
}
