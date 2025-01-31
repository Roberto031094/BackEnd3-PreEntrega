export class ProductResponseDto {
  constructor({ title, category, stock, price }) {
    this.title = title;
    this.category = category;
    this.stock = stock;
    this.price = price;
  }
}
