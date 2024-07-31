import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/product/list')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <div className="product-list">
            <h2>물품리스트</h2>
            {products.map(product => (
                <div key={product.product_id} className="card">
                    {/* <img src='../../public/image1.jpg' alt={product.product_name} /> */}
                    <h2>{product.product_name}</h2>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;