import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChipsAutocompleteComponent } from '../component/chips-autocomplete/chips-autocomplete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode: string = 'determinate'
  placeholder: string = 'New Items'
  allItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  startProgress() {
    this.mode = 'indeterminate';
  }

  stopProgress() {
    this.mode = 'determinate';
  }

}
