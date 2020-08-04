import React from 'react';
import styles from '../styles/contributors.module.css';

// TODO load contributors from GitHub (all-contributors, maybe?)
const contributors = [
  "jlengstorf",
  "rafaelconde",
  "alex-netlify",
  "scottmathson",
  "bigash42",
  "sdras",
  "marisamorby",
  "amarilisd",
  "ikristy",
];

export function Contributors() {
  return (
    <aside className={styles.contributors}>
      <div className={styles.container}>
        {contributors.map((contributor) => (
          <a
            href={`https://github.com/${contributor}`}
            className={styles.avatar}
            key={contributor}
          >
            <img
              src={`https://github.com/${contributor}.png?size=200`}
              alt={contributor}
            />
          </a>
        ))}
      </div>
      <p className={styles.tagline}>
        built by a bunch of wonderful people and one total weirdo
      </p>
    </aside>
  );
}
