import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GithubIssue } from '../../model/GithubIssue';
import { catchError, map, merge, startWith, switchMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockHttpDatabase } from '../../services/stock.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import * as moment from 'moment';

import { default as _rollupMoment } from 'moment';
import { Subject, Observable } from 'rxjs';

const moments = _rollupMoment || moment;

export class MyFormat {
  value = 1;
  constructor() {}
  get display() {
    return this.value == 1
      ? {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      : {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MM YYYY',
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'MM YYYY',
        };
  }
  get parse() {
    return this.value == 1
      ? {
          dateInput: 'DD/MM/YYYY',
        }
      : {
          dateInput: 'DD/MM/YYYY',
        };
  }
}

@Component({
  selector: 'app-releaselist',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_FORMATS, useClass: MyFormat }],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule
  ],
  templateUrl: './releaselist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaselistComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'state', 'created', 'actions'];
  datas: GithubIssue[] = [];
  exampleDatabase!: StockHttpDatabase | null;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(
    private _httpClient: HttpClient,
    private _service: StockHttpDatabase,
    @Inject(MAT_DATE_FORMATS) private config: MyFormat
  ) {}

  date: FormControl = new FormControl(new Date('25/06/2024'));
  change() {
    this.config.value = this.config.value == 1 ? 2 : 1;
    this.date = new FormControl(this.date.value);
  }

  ngAfterViewInit(): void {
    this.exampleDatabase = new StockHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          console.log('merge');
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => of(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.datas = data));

  }
}
