import React, { useState } from "react";
import ProductList from "../components/ProductList";

const Product = () => {
  const [product, setProduct] = useState([]);

  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Product;
