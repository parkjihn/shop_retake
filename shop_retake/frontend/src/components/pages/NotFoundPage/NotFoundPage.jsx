import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import cactus from "./img/404.svg";

function NotFoundPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.error}>
          <img src={cactus} alt="Cactus" className={styles.cactus} />

          <h2 className={styles.message}>Page Not Found</h2>
          <p className={styles.description}>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage.
          </p>
          <Link to="/" className={styles.homeButton}>
            Go Home
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default NotFoundPage;
