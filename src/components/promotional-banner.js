import React from 'react';
import styles from '../styles/promotional-banner.module.css';
import promoImg from "../assets/1ms-dev-promo-image.png";
import Arrow from "./arrow";

export function PromotionalBanner() {
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.badgeContainer}>
          <span className={styles.badge}>Limited Edition</span>
        </p>
        <p className={styles.heading}>
          1M Developers
          <br />
          Collection
        </p>
        <a href="#promo" className={styles.button}>
          Shop now
          <Arrow />
        </a>
      </div>
      <div className={styles.image}>
        <img src={promoImg} alt="" />
      </div>
    </div>
  );
}
