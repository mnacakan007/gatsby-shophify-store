import React from "react";
import styles from "../../styles/sizing-chart.module.css";
import jammies from "../../assets/sizing-chart-jammies.png";

export default function SizingChartJammies() {
  return (
    <div className={styles.container}>
      <img src={jammies} alt="Sizing guide for jammies" />
      <table className={styles.table}>
        <caption className="sr-only">Sizing chart</caption>
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Waist</th>
            <th scope="col">Length</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XS</td>
            <td><span className={styles.tableSmall}>Waist: </span>24”</td>
            <td><span className={styles.tableSmall}>Length: </span>37.5”</td>
          </tr>
          <tr>
            <td>S</td>
            <td><span className={styles.tableSmall}>Waist: </span>26”</td>
            <td><span className={styles.tableSmall}>Length: </span>38”</td>
          </tr>
          <tr>
            <td>M</td>
            <td><span className={styles.tableSmall}>Waist: </span>28”</td>
            <td><span className={styles.tableSmall}>Length: </span>38.5”</td>
          </tr>
          <tr>
            <td>L</td>
            <td><span className={styles.tableSmall}>Waist: </span>30”</td>
            <td><span className={styles.tableSmall}>Length: </span>39”</td>
          </tr>
          <tr>
            <td>XL</td>
            <td><span className={styles.tableSmall}>Waist: </span>32”</td>
            <td><span className={styles.tableSmall}>Length: </span>40”</td>
          </tr>
          <tr>
            <td>2XL</td>
            <td><span className={styles.tableSmall}>Waist: </span>34”</td>
            <td><span className={styles.tableSmall}>Length: </span>41”</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
