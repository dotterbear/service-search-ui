import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, MatSidenav } from '@angular/material';
import { HttpService } from "../service/http.service";
import { APIResponse } from '../entity/APIResponse';
import { Item } from '../entity/Item';
import { environment } from '../environments/environment';
import { HttpParams } from "@angular/common/http";
import { FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode: string = 'determinate'

  // for search
  placeholder: string = 'New Items'
  allItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  // for data table
  displayedColumns: string[] = ['summary'];
  dataSource = new MatTableDataSource<Item>();
  totalItems: number;
  selectedItem: any;

  // for side bar
  sidenavMode = new FormControl('side');
  mobileQuery: MediaQueryList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private _mobileQueryListener: () => void;

  constructor(private httpService: HttpService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getList(1, 25);

    this.paginator.page.subscribe((page: PageEvent) => {
      if (this.selectedItem) {
        this.sidenav.toggle()
      }
      this.selectedItem = '';
      this.getList(page.pageIndex + 1, page.pageSize);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // TODO: wait for api support
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  startProgress() {
    this.mode = 'indeterminate';
  }

  stopProgress() {
    this.mode = 'determinate';
  }

  getList(page: any, size: any) {
    this.startProgress();
    let params = new HttpParams().set('page', page).set('size', size);
    this.httpService
      .get<APIResponse<Item>>(environment.getAll, params)
      .subscribe((response: any) => {
        if (!response.message) {
          this.totalItems = response.totalItems || 10000; // TODO: wait for api support
          this.dataSource.data = response.jobAdItems as Item[];
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

}
