import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const HomePage = () => {
  const products = [
    { id: 1, name: '상품1', description: '설명1', price: '₩1000' },
    { id: 2, name: '상품2', description: '설명2', price: '₩2000' },
    { id: 3, name: '상품3', description: '설명3', price: '₩3000' },
  ];

  return (
    <div className="home-page">
      <Header />
      <div className="product-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button className="view-all-button">모두보기 >></button>
      <Footer />
    </div>
  );
};

export default HomePage;
