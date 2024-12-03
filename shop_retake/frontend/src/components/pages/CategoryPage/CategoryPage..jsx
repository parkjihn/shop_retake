import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";

function CategoryPage() {
  const { categoryId } = useParams(); 
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3333/categories/${categoryId}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch category products.");
        }

        setProducts(data);
        setCategoryName(data.length > 0 ? data[0].categoryName : ""); 
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{categoryName || "Category"} Products</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={`http://localhost:3333/${product.image}`}
              alt={product.title}
              className={styles.productImage}
            />
            <p className={styles.productName}>{product.title}</p>
            <p className={styles.productPrice}>
              ${product.discont_price || product.price}
              {product.discont_price && (
                <span className={styles.originalPrice}>${product.price}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
