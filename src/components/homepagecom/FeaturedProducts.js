import React from "react";
import "./FeaturedProducts.css";

const FeaturedProducts = ({ title, products, onProductClick }) => {
  return (
    <section className="featured-products" aria-label={title}>
      <h2>{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <article
            key={product.id}
            className="product-item"
            onClick={() => onProductClick(product.category)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onProductClick(product.category);
            }}
          >
            <figure className="product-media">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </figure>

            <div className="product-info">
              <header>
                <h3 className="product-name">{product.name}</h3>
              </header>

              {/* <p className="product-description">{product.description}</p> */}
              <p className="product-price">Rs. {product.price}</p>

              <button
                className="buy-button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent onClick
                  onProductClick(product.category);
                }}
                aria-label={`View more about ${product.name}`}
              >
                View more
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
