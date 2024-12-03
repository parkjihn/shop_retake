import React, { useEffect, useState } from "react";
import styles from "./AllProductsPage.module.css";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    discounted: false,
  });
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3333/products/all");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesPrice =
        (!filter.minPrice || product.price >= filter.minPrice) &&
        (!filter.maxPrice || product.price <= filter.maxPrice);
      const matchesDiscounted =
        !filter.discounted ||
        (product.discont_price && product.discont_price < product.price);
      return matchesPrice && matchesDiscounted;
    })
    .sort((a, b) => {
      if (sortOrder === "default") return 0;
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>All Products</h1>
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
            <label>
              <input
                type="checkbox"
                name="discounted"
                checked={filter.discounted}
                onChange={handleFilterChange}
              />
              Discounted items
            </label>
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
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={`http://localhost:3333/${product.image}`}
                alt={product.title}
                className={styles.productImage}
              />
              <p className={styles.productName}>{product.title}</p>
              <div className={styles.priceContainer}>
                {product.discont_price &&
                product.discont_price < product.price ? (
                  <>
                    <span className={styles.salePrice}>
                      ${product.discont_price}
                    </span>
                    <span className={styles.originalPrice}>
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className={styles.originalPrice}>${product.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AllProductsPage;
