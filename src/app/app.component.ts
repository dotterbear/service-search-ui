import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, MatSidenav } from '@angular/material';
import { HttpService } from "../service/http.service";
import { APIResponse } from '../entity/APIResponse';
import { Item } from '../entity/Item';
import { environment } from '../environments/environment';
import { HttpParams } from "@angular/common/http";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { getListeners } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode = 'determinate';

  searchForm: FormGroup;

  // for search
  placeholder: string = 'New Items';
  allItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  // for sort
  defaultSoredColumn = 'ts';
  sortcolumns = [{
    key: 'default',
    value: this.defaultSoredColumn,
    text: 'Default'
  }, {
    key: 'title',
    value: 'title',
    text: 'Title'
  }, {
    key: 'postedDate',
    value: 'ts',
    text: 'Posted Date'
  }];
  sortedColumnKey: string;
  sortedColumn: string;
  sortedAsc = 'asc';
  sortedDesc = 'desc';
  sortedOrder = this.sortedAsc;

  // for data table
  displayedColumns: string[] = ['summary'];
  dataSource = new MatTableDataSource<Item>();
  totalItems: number;
  selectedItem: any;
  pageSize = 25;

  // for side bar
  sidenavMode = new FormControl('side');
  mobileQuery: MediaQueryList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private mobileQueryListener: () => void;

  constructor(private httpService: HttpService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, formBuilder: FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.searchForm =  formBuilder.group({
      query: '',
      'company-name': ''
    });
  }

  ngOnInit(): void {
    this.getList(1, this.pageSize);

    this.paginator.page.subscribe((page: PageEvent) => {
      if (this.selectedItem) {
        this.sidenav.toggle()
      }
      this.selectedItem = '';
      this.getList(page.pageIndex + 1, page.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  startProgress() {
    this.mode = 'indeterminate';
  }

  stopProgress() {
    this.mode = 'determinate';
  }

  getList(page: any, size: any, orderBy?: string, order?: string, formValue?: any) {
    this.startProgress();
    const params = new HttpParams()
        .set('page', page)
        .set('size', size)
        .set('orderBy', orderBy || this.defaultSoredColumn)
        .set('direction', order || this.sortedAsc)
        .set('query', formValue && formValue.query || '')
        .set('company-name', formValue && formValue['company-name']);
    this.httpService
      .get<APIResponse<Item>>(environment.getAll, params)
      .subscribe((response: any) => {
        if (response.code === '200') {
          this.dataSource.data = response.jobAdItems as Item[];
          this.totalItems = response.totalItemNum || this.dataSource.data.length;
        }
      },
      error => {
        console.log(error);
        this.stopProgress()
      },
      () => this.stopProgress()
    );
  }

  getItem(row: any) {
    console.log(row);
  }

  sort(column: any) {
    if (this.sortedColumnKey === column.key) {
      this.sortedOrder = this.sortedOrder === this.sortedAsc ? this.sortedDesc : this.sortedAsc;
    } else {
      this.sortedOrder = this.sortedAsc;
    }
    this.sortedColumnKey = column.key;
    this.sortedColumn = column.value;
    this.getList(1, this.pageSize, this.sortedColumn, this.sortedOrder, this.searchForm.value);
  }

  search() {
    this.getList(1, this.pageSize, this.sortedColumn, this.sortedOrder, this.searchForm.value);
  }

}
