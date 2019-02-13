import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChipsAutocompleteComponent } from './chips-autocomplete.component';

describe('ChipsAutocompleteComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ChipsAutocompleteComponent
      ],
    }).compileComponents();
  }));

});
