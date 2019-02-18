import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChipsAutocompleteComponent } from '../component/chips-autocomplete/chips-autocomplete.component';
import { HttpService } from "../service/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode: string = 'determinate'
  placeholder: string = 'New Items'
  allItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  listItems: [];

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.httpService
      .all()
      .subscribe((response: Response) => {
        let reponseJson = response.json();
        this.listItems = new Principal(reponseJson);
      }, (error) => {
        console.log(error);
      });
  }

  startProgress() {
    this.mode = 'indeterminate';
  }

  stopProgress() {
    this.mode = 'determinate';
  }

}
