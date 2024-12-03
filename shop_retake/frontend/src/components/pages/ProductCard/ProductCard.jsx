import React, { useState } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`http://localhost:3333/${product.image}`}
        alt={product.title}
        className={styles.image}
      />
      {isHovered && (
        <button
          className={styles.addToCartButton}
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      )}
      <div className={styles.details}>
        <p className={styles.name}>{product.title}</p>
        <p className={styles.price}>
          ${product.discont_price || product.price}
          {product.discont_price && (
            <span className={styles.originalPrice}>${product.price}</span>
          )}
        </p>
        {product.discount && (
          <span className={styles.discount}>-{product.discount}%</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
