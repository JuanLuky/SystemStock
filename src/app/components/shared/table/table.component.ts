import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule
  ],
  templateUrl: './table.component.html',
})
export class TableComponent {

  @Input() dataSource: any[] = []; // Recebe a lista de dados a serem exibidos na tabela
  @Input() displayedColumns: string[] = []; // Define as colunas a serem mostradas
  @Input() columnLabels: { [key: string]: string } = {}; // Mapeia nomes legíveis para cada coluna
  @Input() totalElements: number = 0; // Número total de itens (para paginação)
  @Input() pageSize: number = 10; // Quantidade de itens por página
  @Input() pageIndex: number = 0; // Página atual

  @Output() pageChange = new EventEmitter<PageEvent>();



  handlePageEvent(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
