
import React from "react";
import { Link } from "react-router-dom";
import logo from './img/logo.svg'
import cart from './img/cart.svg'
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
        <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Main Page</Link>
        <Link to="/categories" className={styles.navLink}>Categories</Link>
        <Link to="/products/all" className={styles.navLink}>All Products</Link>
        <Link to="/sales" className={styles.navLink}>All Sales</Link>
      </nav>
      <div className={styles.cartIcon}>
        <Link to="/cart">
        <img src={cart} alt="Cart" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
