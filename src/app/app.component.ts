import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent } from '@angular/material';
import { HttpService } from "../service/http.service";
import { APIResponse } from '../entity/APIResponse';
import { Item } from '../entity/Item';
import { environment } from '../environments/environment';
import { HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode: string = 'determinate'
  placeholder: string = 'New Items'
  allItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  displayedColumns: string[] = ['title', 'companyName', 'location', 'industry', 'yearsOfExp', 'careerLevel', 'employmentType', 'postedDate'];
  dataSource = new MatTableDataSource<Item>();
  totalItems: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.getList(1, 25);

    this.paginator.page.subscribe((page: PageEvent) => {
      this.getList(page.pageIndex + 1, page.pageSize);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // TODO: wait for api support
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

}
