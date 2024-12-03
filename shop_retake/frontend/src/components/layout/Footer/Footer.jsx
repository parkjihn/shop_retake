
import React from "react";
import styles from "./Footer.module.css";
import insta from './img/insta.svg'
import whatsapp from './img/whatsapp.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>Contact</h2>
      <div className={styles.info}>
        <div className={styles.contactCard}>
          <h3>Phone</h3>
          <p>+7 (499) 350-66-04</p>
        </div>
        <div className={styles.contactCard}>
          <h3>Socials</h3>
          <img src={insta} alt=""></img>
          <img src={whatsapp} alt=""></img>
        </div>
        <div className={styles.contactCard}>
          <h3>Address</h3>
          <p>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
        </div>
        <div className={styles.contactCard}>
          <h3>Working Hours</h3>
          <p>24 hours a day</p>
        </div>
      </div>
      <div className={styles.map}>
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4495.217420246279!2d37.63082704577172!3d55.71317296401482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b22a91ac945%3A0xf19f72681321ff46!2sIThub%20college!5e0!3m2!1sen!2suk!4v1732527320902!5m2!1sen!2suk" 
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
