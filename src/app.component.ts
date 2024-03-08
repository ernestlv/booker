import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CitiesService} from './cities.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  cities:{ name: string; value: string }[] = [];

  form = new FormGroup({
    origen: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    range: new FormGroup({
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required)
    })
  });

  constructor(
    private cityService:CitiesService
  ){}

  ngOnInit() {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  onSubmit() {
    alert('XXX!!!!')
  }
}
