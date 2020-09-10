import React from 'react';
import styles from '../../styles/sizing-chart.module.css';
import shirt from '../../assets/sizing-chart-shirt.svg';

export default function SizingChartShirts() {
  
  return (
    <div className={styles.container}>
      <img src={shirt} alt="Sizing guide for shirts" />
      <table className={styles.table}>
        <caption className="sr-only">Sizing chart</caption>
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Shoulder</th>
            <th scope="col">Chest</th>
            <th scope="col">Length</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td><span className={styles.tableSmall}>Shoulder: </span>18”</td>
            <td><span className={styles.tableSmall}>Chest: </span>38”</td>
            <td><span className={styles.tableSmall}>Length: </span>27”</td>
          </tr>
          <tr>
            <td>M</td>
            <td><span className={styles.tableSmall}>Shoulder: </span>19”</td>
            <td><span className={styles.tableSmall}>Chest: </span>40”</td>
            <td><span className={styles.tableSmall}>Length: </span>28”</td>
          </tr>
          <tr>
            <td>L</td>
            <td><span className={styles.tableSmall}>Shoulder: </span>20”</td>
            <td><span className={styles.tableSmall}>Chest: </span>42”</td>
            <td><span className={styles.tableSmall}>Length: </span>29”</td>
          </tr>
          <tr>
            <td>XL</td>
            <td><span className={styles.tableSmall}>Shoulder: </span>21”</td>
            <td><span className={styles.tableSmall}>Chest: </span>44”</td>
            <td><span className={styles.tableSmall}>Length: </span>30”</td>
          </tr>
          <tr>
            <td>2XL</td>
            <td><span className={styles.tableSmall}>Shoulder: </span>22”</td>
            <td><span className={styles.tableSmall}>Chest: </span>46”</td>
            <td><span className={styles.tableSmall}>Length: </span>31”</td>
          </tr>
          <tr>
            <td>3XL</td>
            <td><span className={styles.tableSmall}>Shoulder: </span>23”</td>
            <td><span className={styles.tableSmall}>Chest: </span>48”</td>
            <td><span className={styles.tableSmall}>Length: </span>32”</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
