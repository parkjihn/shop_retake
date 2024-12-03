import React, { useEffect, useState } from "react";
import styles from "./AllSalesPage.module.css";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function AllSalesPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3333/products/all");
        const data = await response.json();

        const discountedProducts = data.filter(
          (product) =>
            product.discont_price && product.discont_price < product.price
        );

        setProducts(discountedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesMinPrice =
        filter.minPrice === "" ||
        product.discont_price >= Number(filter.minPrice);
      const matchesMaxPrice =
        filter.maxPrice === "" ||
        product.discont_price <= Number(filter.maxPrice);
      return matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "default") return 0;
      if (sortOrder === "price-asc") return a.discont_price - b.discont_price;
      if (sortOrder === "price-desc") return b.discont_price - a.discont_price;
      return 0;
    });

  return (
    <>
    <Header/>
      <div className={styles.container}>
        <h1 className={styles.title}>Discounted Items</h1>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>Price:</label>
            <input
              type="number"
              placeholder="From"
              name="minPrice"
              value={filter.minPrice}
              onChange={handleFilterChange}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="To"
              name="maxPrice"
              value={filter.maxPrice}
              onChange={handleFilterChange}
              className={styles.input}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Sorted:</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className={styles.select}
            >
              <option value="default">by default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className={styles.salesGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.saleCard}>
              <img
                src={`http://localhost:3333/${product.image}`}
                alt={product.title}
                className={styles.saleImage}
              />
              <p className={styles.saleName}>{product.title}</p>
              <div className={styles.priceContainer}>
                <span className={styles.salePrice}>
                  ${product.discont_price}
                </span>
                <span className={styles.originalPrice}>${product.price}</span>
              </div>
              <span className={styles.discount}>
                -
                {Math.round(
                  ((product.price - product.discont_price) / product.price) *
                    100
                )}
                %
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AllSalesPage;
