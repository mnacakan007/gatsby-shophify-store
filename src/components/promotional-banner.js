import React from 'react';
import styles from '../styles/promotional-banner.module.css';

export function PromotionalBanner({ collection }) {
  
  return (
     <div className={styles.container}>
      <p className={styles.heading}>
        Buy 1 Item<br />
        Get 1 Item free<br />
        1 use per order
      </p>
      <p className={styles.legal}>
        * For everyone / Limit of 100 uses, one per customer / active until August 7
      </p>
     </div>
  );
}
