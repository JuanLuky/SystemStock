import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';
import { ProductPage } from '../model/product-page';
import { MovementPage } from '../model/movement-page';

@Injectable({
  providedIn: 'root'
})
export class StockHttpService {
  private readonly API_URL = 'http://localhost:8080/api/produtos';

  private readonly API_URL_MOV = 'http://localhost:8080/api/movimentacoes';

  constructor(private http: HttpClient) {}


  listarProdutos(page = 0, size = 10) {
    return this.http.get<ProductPage>(this.API_URL, { params: { page, size} })
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
  // private create(record: Partial<Course>) {
  //   return this.http.post<Course[]>(this.URL_API, record).pipe(first());
  // }
}
