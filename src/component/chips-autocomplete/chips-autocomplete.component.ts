import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-component',
  templateUrl: 'chips-autocomplete.component.html',
  styleUrls: ['chips-autocomplete.component.css'],
})
export class ChipsAutocompleteComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  items: string[] = [];

  @Input('placeholder') placeholder: string = '';
  @Input('allItems') allItems: string[]

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
        startWith(null),
        map((items: string | null) => items ? this._filter(this.items) : this.allItems.slice()));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.items.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.itemCtrl.setValue(null);
    }
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemInput.nativeElement.blur();
    this.itemCtrl.setValue(event.option.viewValue);
  }

  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter((item: string) => item && item.toLowerCase().indexOf(filterValue) !== 0);
  }*/

  private _filter(items: string[]): string[] {
    return this.allItems.filter((item: string) => items.indexOf(item) !== 0);
  }
}
