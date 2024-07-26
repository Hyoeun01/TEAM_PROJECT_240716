export default class Product {
  constructor(
    product_id,
    product_name,
    price,
    total_quantity,
    category,
    content,
    product_img
  ) {
    this, (product_id = product_id);
    this.product_name = product_name;
    this.price = price;
    this.total_quantity = total_quantity;
    this.category = category;
    this.content = content;
    this.product_img = product_img;
  }
}
