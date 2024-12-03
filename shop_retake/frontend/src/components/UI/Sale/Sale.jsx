import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./Sale.module.css";

function Sale() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:3333/products/all"); 
        const data = await response.json();

    
        const discountedProducts = data.filter(
          (product) => product.discont_price && product.discont_price < product.price
        );

        setSales(discountedProducts.slice(0, 4)); 
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sale</h2>
        <button className={styles.allSalesButton} onClick={() => navigate("/sales")}>
          All Sales
        </button>
      </div>
      <div className={styles.salesGrid}>
        {sales.map((sale) => (
          <div key={sale.id} className={styles.saleCard}>
            <img
              src={`http://localhost:3333/${sale.image || "images/default.jpg"}`}
              alt={sale.title}
              className={styles.saleImage}
            />
            <p className={styles.saleName}>{sale.title}</p>
            <div className={styles.priceContainer}>
              <span className={styles.salePrice}>${sale.discont_price}</span>
              <span className={styles.originalPrice}>${sale.price}</span>
            </div>
            <span className={styles.discount}>
              -{Math.round(((sale.price - sale.discont_price) / sale.price) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sale;
