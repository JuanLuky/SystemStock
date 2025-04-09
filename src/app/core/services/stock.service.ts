import { Product } from './../../model/Product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';
import { ProductPage } from '../../model/product-page';
import { MovementPage } from '../../model/movement-page';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockHttpService {
  private readonly API_URL_PROD = environment.API_URL_PROD;

  private readonly API_URL_MOV = environment.API_URL_MOV;

  constructor(private http: HttpClient) {}


  listarProdutos(page = 0, size = 10) {
    return this.http.get<ProductPage>(this.API_URL_PROD, { params: { page, size} })
    .pipe(
      first(),
      delay(1000) // Simulating API latency
    );
  }

  listarMovimentacoes(page = 0, size = 10) {
    return this.http.get<MovementPage>(this.API_URL_MOV, { params: { page, size} })
    .pipe(
      first(),
      delay(1000) // Simulating API latency
    );
  }

  cadastrarProduto(produto: { nome: string; codigo: number; quantidade: number }) {
    return this.http.post(this.API_URL_PROD, produto).pipe(first());
  }

  // createMovimentacao(movimentacao: { productId: number; quantity: number }) {
  //   return this.http.post(this.API_URL_MOV, movimentacao).pipe(first());
  // }
}
