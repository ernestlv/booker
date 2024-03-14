import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CitiesService } from './cities.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  minDate = new Date();

  cities:{ name: string; value: string }[] = [];

  form = new FormGroup({
    departure: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departDate: new FormControl<Date | null>(null, Validators.required),
    returnDate: new FormControl<Date | null>(null, Validators.required)
  }, { validators: [this.cityValidator, this.rangeValidator] });

  constructor(
    public dialog: MatDialog,
    private cityService:CitiesService
  ){}

  ngOnInit() {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  onSubmit() {
    //alert('Happy Jetting!')
    this.dialog.open(DialogComponent);
  }

  cityValidator(control: AbstractControl) {
    const departure = control.get('departure');
    const destination = control.get('destination');

    return departure!.value && destination!.value && departure!.value === destination!.value ? {invalidDestination: true} : null;
  }

  rangeValidator(control: AbstractControl) {
    const departD = control.get('departDate');
    const returnD = control.get('returnDate');

    return departD!.value && returnD!.value && departD!.value.getTime() > returnD!.value.getTime() ? {invalidRange: true} : null;
  }
}
