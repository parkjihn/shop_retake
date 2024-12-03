import React, { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.css";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";


function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories/all");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
    <Header/>
      <div className={styles.container}>
        <h2 className={styles.title}>Categories</h2>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              <img
                src={`http://localhost:3333/${category.image}`}
                alt={category.title}
                className={styles.categoryImage}
              />
              <p className={styles.categoryName}>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default CategoriesPage;
