import React, { useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
 
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3333/cart");
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    try {
   
      const response = await fetch(`http://localhost:3333/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) throw new Error("Failed to update cart item");

    
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
   
      const response = await fetch(`http://localhost:3333/cart/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove cart item");

    
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await fetch("http://localhost:3333/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userDetails, cartItems }),
      });
      if (!response.ok) throw new Error("Failed to place order");

      alert("Order placed successfully!");
      setCartItems([]); 
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const handleUserDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <Header/>
     <div className={styles.container}>
      <h1 className={styles.title}>Shopping cart</h1>
      <button className={styles.backButton} onClick={() => window.history.back()}>
        Back to the store
      </button>
      <div className={styles.cart}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={`http://localhost:3333/${item.image}`}
                alt={item.name}
                className={styles.cartImage}
              />
              <div className={styles.cartDetails}>
                <p className={styles.cartName}>{item.name}</p>
                <p className={styles.cartPrice}>
                  ${item.price} {item.originalPrice && <span>${item.originalPrice}</span>}
                </p>
              </div>
              <div className={styles.cartQuantity}>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                ×
              </button>
            </div>
          ))}
        </div>
        <div className={styles.orderSummary}>
          <h2>Order details</h2>
          <p>{totalItems} items</p>
          <p>Total: ${totalPrice}</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleUserDetailChange}
            className={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={userDetails.phone}
            onChange={handleUserDetailChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleUserDetailChange}
            className={styles.input}
          />
          <button onClick={handleOrder} className={styles.orderButton}>
            Order
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
}

export default CartPage;
