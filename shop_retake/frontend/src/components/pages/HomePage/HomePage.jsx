import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import styles from "./HomePage.module.css";
import discount_img from "./img/discount_img.svg";
import Categories from "../../UI/Categories/Categories";
import Sale from "../../UI/Sale/Sale";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Header />

      <div className={styles.banner}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Amazing Discounts on Garden Products!
          </h1>
          
          <div>
          <Link to="/cart">
          <button className={styles.button}>Check out</button>
          </Link>
        
          </div>
          
        </div>
      </div>

      <Categories/>

      <div className={styles.discountSection}>
        <h2 className={styles.discountTitle}>5% off on the first order</h2>
        <div className={styles.discountContentWrapper}>
          <div className={styles.imageSection}>
            <img
              src={discount_img}
              alt="Hands holding garden tools"
              className={styles.discountImage}
            />
          </div>
          <div className={styles.discountContent}>
            <div className={styles.discountForm}>
              <input className={styles.input} type="text" placeholder="Name" />
              <input
                className={styles.input}
                type="text"
                placeholder="Phone number"
              />
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
              />
              <button className={styles.discountButton}>Get a discount</button>
            </div>
          </div>
        </div>
      </div>

      <Sale/>

      <Footer />
    </>
  );
}

export default HomePage;
