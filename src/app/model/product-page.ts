import { Product } from "./Product";

export interface ProductPage {
  product: Product[];
  totalElements: number;
  totalPages: number;
}
