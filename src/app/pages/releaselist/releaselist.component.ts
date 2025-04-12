import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { default as _rollupMoment } from 'moment';
import { catchError, Observable, of, tap } from 'rxjs';
import { TableComponent } from '../../shared/table/table.component';
import type { MovementPage } from '../../model/movement-page';
import { StockHttpService } from '../../core/services/stock.service';


@Component({
  selector: 'app-releaselist',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TableComponent,
    AsyncPipe,
  ],
  templateUrl: './releaselist.component.html',
})
export class ReleaselistComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data$: Observable<MovementPage> | undefined;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private _httpClient: HttpClient,
    private _service: StockHttpService
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.data$ = this._service
      .listarMovimentacoes(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError((error) => {
          return of({ movement: [], totalElements: 0, totalPages: 0 });
        })
      );
  }

}
