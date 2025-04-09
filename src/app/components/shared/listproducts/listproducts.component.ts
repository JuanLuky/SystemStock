import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { catchError, of, Observable, tap, BehaviorSubject, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { ProductPage } from '../../../model/product-page';
import { StockHttpService } from '../../../core/services/stock.service';
import { TableComponent } from '../table/table.component';
import { ModalProdutosComponent } from '../modal-produtos/modal-produtos.component';
import type { Product } from '../../../model/Product';

@Component({
  selector: 'app-listproducts',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AsyncPipe,
    TableComponent,
    CommonModule,
    ModalProdutosComponent,
    ModalProdutosComponent,
  ],
  templateUrl: './listproducts.component.html',
})
export class ListproductsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data$ = new BehaviorSubject<ProductPage>({
    product: [],
    totalElements: 0,
    totalPages: 0,
  });

  loading : boolean = false;

  exibirModal: boolean = false;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private _httpClient: HttpClient,
    private _service: StockHttpService
  ) {
    this.refresh();
    this.ativarLoadingComDelay();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    console.log('[refresh] Atualizando produtos...');

    this._service
      .listarProdutos(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError((error) => {
          console.error('[refresh] Erro ao listar produtos', error);
          return of({ product: [], totalElements: 0, totalPages: 0 });
        })
      )
      .subscribe((data) => {
        this.data$.next(data); // <-- Aqui atualiza a lista visível
      });
  }

  abrirModalCadastro() {
    console.log('abrindo modal de cadastro');
    this.exibirModal = true;
  }
  fecharModal() {
    console.log('fechando modal de cadastro');
    this.exibirModal = false;
  }
  atualizarListaProduto(produto: Product) {
    this.fecharModal();

    const atual = this.data$.value;

    // adiciona o novo item no início da lista
    const novaLista = [produto, ...atual.product];

    this.data$.next({
      ...atual,
      product: novaLista,
      totalElements: atual.totalElements + 1,
    });
  }

  ativarLoadingComDelay() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      console.log('Loading desativado após 2 segundos');
    }, 1000); // 2000 ms = 2 segundos
  }

}
