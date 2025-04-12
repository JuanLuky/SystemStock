import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StockHttpService } from '../../core/services/stock.service';
import type { Product } from '../../model/Product';

@Component({
  selector: 'app-modal-produtos',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './modal-produtos.component.html',
})
export class ModalProdutosComponent {
  private fb = inject(FormBuilder);
  private stockService = inject(StockHttpService);

  @Output() fechar = new EventEmitter<void>();
  @Output() produtoAdicionado = new EventEmitter<Product>();

  form = this.fb.group({
    nome: ['', Validators.required],
    codigo: ['', Validators.required],
    quantidade: [0, [Validators.required, Validators.min(1)]],
  });

  get progressoPreenchimento(): number {
    const totalCampos = 3;
    let preenchidos = 0;

    if (this.form.get('nome')?.value) preenchidos++;
    if (this.form.get('codigo')?.value) preenchidos++;
    const quantidade = this.form.get('quantidade')?.value ?? 0;
    if (quantidade > 0) preenchidos++;

    return (preenchidos / totalCampos) * 100;
  }



  fecharModal() {
    this.fechar.emit();
  }

  addProduct() {
    console.log('Product added!');

    if (this.form.valid) {
      const produto = {
        nome: this.form.value.nome || '',
        codigo: Number(this.form.value.codigo) || 0,
        quantidade: Number(this.form.value.quantidade) || 0,
      };

      this.stockService.cadastrarProduto(produto).subscribe({
        next: (res) => {
          this.produtoAdicionado.emit(res as Product); // passa o objeto salvo
          this.form.reset();
          this.fecharModal();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar produto!');
        },
      });
    }
  }
}
