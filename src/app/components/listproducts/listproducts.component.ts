import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { catchError, of, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { StockHttpService } from '../../services/stock.service';
import { ProductPage } from '../../model/product-page';


@Component({
  selector: 'app-listproducts',
  standalone: true,
  imports: [MatCardModule,MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, SidebarComponent, AsyncPipe],
  templateUrl: './listproducts.component.html',
})
export class ListproductsComponent {
  displayedColumns: string[] = ['codigo', 'nome', 'quantidade'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data$: Observable<ProductPage> | null = null;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private _httpClient: HttpClient, private _service: StockHttpService) {
    this.refresh();
   }

   refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10 }) {
    this.data$ = this._service.listarProdutos(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError((error) => {
        return of({product: [], totalElements: 0, totalPages: 0});
      })
    )
  }
}
