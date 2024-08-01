import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; // CSS 파일 경로

const Admin = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/product/list');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Total Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.category}</td>
                            <td>{product.content}</td>
                            <td className="center-align">{product.price}</td>
                            <td>{product.product_img}</td>
                            <td>{product.product_name}</td>
                            <td className="center-align">{product.total_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
