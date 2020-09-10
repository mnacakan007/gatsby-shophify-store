import React, { useState } from 'react';
import Image from "gatsby-image";
import styles from '../styles/product-page-thumbnail.module.css';

const ProductPageThumbnail = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          {images.map((image, index) => {
            return (
              <Image
                fluid={image.localFile.childImageSharp.fluid}
                className={index === selected ? styles.selected : ""}
              />
            );
          })}
        </div>
        <div className={styles.gallery}>
          {images.length > 1 && images.map((image, index) => {
            return (
              <button
                onClick={() => setSelected(index)}
                className={index === selected ? styles.selected : ""}
              >
                <Image fluid={image.localFile.childImageSharp.fluid} />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductPageThumbnail;
