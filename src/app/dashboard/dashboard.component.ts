import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trainee } from '../trainee.model';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  newTraineeForm!: FormGroup;
  traineeObj: Trainee = new Trainee();
  allTrainees!: Trainee[];
  filteredTrainees!: Trainee[];
  editMode: boolean = false;
  filteredMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.newTraineeForm = this.formBuilder.group({
      name: ['', Validators.required],
      numOfMonths: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', Validators.required],
      notes:['']
    });
    this.getAllTrainees();    
  }

  addTrainee() {
    this.editMode = false;
    this.traineeObj.name = this.newTraineeForm.value.name;
    this.traineeObj.months = this.newTraineeForm.value.numOfMonths;
    this.traineeObj.startDate = this.newTraineeForm.value.startDate;
    this.traineeObj.endDate = this.newTraineeForm.value.endDate;
    this.traineeObj.price = this.newTraineeForm.value.price;
    this.traineeObj.notes = this.newTraineeForm.value.notes;
    this.traineeObj.id = Guid.create().toString()
    
    this.api.postTrainee(this.traineeObj)
    this.getAllTrainees();
    this.newTraineeForm.reset();
    document.getElementById('close')?.click();
  }

  getAllTrainees() {
    
    this.filteredTrainees = this.allTrainees = this.api.getTrainees()
    
  }

  deleteThisTrainee(trainee:Trainee) {
    this.api.deleteTrainee(trainee)
    this.getAllTrainees();
  }

  onEdit(trainee: Trainee) {
    this.editMode = true;
    this.traineeObj.id = trainee.id;

    this.newTraineeForm.controls['name'].setValue(trainee.name);
    this.newTraineeForm.controls['numOfMonths'].setValue(trainee.months);
    this.newTraineeForm.controls['startDate'].setValue(trainee.startDate);
    this.newTraineeForm.controls['endDate'].setValue(trainee.endDate);
    this.newTraineeForm.controls['price'].setValue(trainee.price);
    this.newTraineeForm.controls['notes'].setValue(trainee.notes);
  }

  editThisTrainee() {
    this.traineeObj.name = this.newTraineeForm.value.name;
    this.traineeObj.months = this.newTraineeForm.value.numOfMonths;
    this.traineeObj.startDate = this.newTraineeForm.value.startDate;
    this.traineeObj.endDate = this.newTraineeForm.value.endDate;
    this.traineeObj.price = this.newTraineeForm.value.price;
    this.traineeObj.notes = this.newTraineeForm.value.notes;

    this.api.editTrainee(this.traineeObj.id, this.traineeObj)
      this.editMode = false;
      this.traineeObj.id = '';
      document.getElementById('close')?.click();
      this.newTraineeForm.reset();
      this.getAllTrainees();
    
  }

  close() {
    this.editMode = false;
    this.newTraineeForm.reset();
  }

  search(searchValue: any) {
    if (searchValue.target.value) {
      if (!this.filteredMode) {
        this.filteredTrainees = this.allTrainees.filter((trainee) =>
          trainee.name
            .toLowerCase()
            .includes(searchValue.target.value.toLowerCase())
        );
      } else {
        this.filteredTrainees = this.filteredTrainees.filter((trainee) =>
          trainee.name
            .toLowerCase()
            .includes(searchValue.target.value.toLowerCase())
        );
      }
    } else if (!searchValue.target.value) {
      if (!this.filteredMode) {
        this.filteredTrainees = this.allTrainees;
      } else {
        this.filteredTrainees = this.allTrainees.filter(
          (trainee) => trainee.expired == true
        );
      }
    }
  }

  selectChangeHandler(event: any) {
    // console.log(event.target.value)
    if (event.target.value == 'expired') {
      this.filteredMode = true;
      this.filteredTrainees = this.allTrainees.filter(
        (trainee) => trainee.expired == true
      );
    } else if (event.target.value == 'all') {
      this.filteredMode = false;
      this.filteredTrainees = this.allTrainees;
    }
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*name of the excel-file which will be downloaded. */
    /* making the fileName the date of the day */
    let today:Date = new Date()
    let fileName = `${today.toLocaleString()}.xlsx`

    /* save to file */
   XLSX.writeFile(wb, fileName);

   
  }
}
