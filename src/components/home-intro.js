import React from "react";
import styles from "../styles/home-intro.module.css";
import parse from "html-react-parser";

export function HomeIntro({ title, body }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      {parse(body)}
    </div>
  );
}
