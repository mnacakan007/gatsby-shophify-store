import React, { useRef, useState } from "react";
import { Link, navigate } from 'gatsby';
import Image from 'gatsby-image';

import ProductTypeLabel from './product-type-label';
import { useCart } from '../context/cart-context';
import styles from '../styles/product-card.module.css';

const BuyButton = ({ variants, slug, title }) => {

  const ref = useRef();

  const [liveRegionMessage, setLiveRegionMessage] = useState("");

  const { addItemToCart } = useCart();
  const lowestPrice = variants.sort(
    (a, b) => a.priceV2.amount - b.priceV2.amount,
  )[0].priceV2;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: lowestPrice.currencyCode,
  }).format(lowestPrice.amount);

  const formattedPrice = () => {
    return `${lowestPrice.currencyCode} ${formatted}`
  }

  const showTooltip = () => {
    const floater = ref.current.querySelector('span');

    floater.style.visibility = 'visible';
    ref.current.classList.add(styles.visible);

    setTimeout(() => {
      ref.current.classList.remove(styles.visible);
      floater.style.visibility = 'hidden';
    }, 1000);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (variants.length > 1) {
      navigate(`/product/${slug}`);
      return;
    }

    showTooltip();
    setLiveRegionMessage(`1 ${title} added to your cart!`);
    await addItemToCart({
      variantId: variants[0].shopifyId,
      quantity: 1,
    });
  };

  // Make sure there's at least one variant available in stock
  const availableForSale = variants.find(variant => variant.availableForSale);
  if (!availableForSale) {
    return (
      <div className={styles.outOfStock}>
        Out of stock
      </div>
    )
  }

  

  return (
    <div>
      <button ref={ref} className={styles.button} onClick={handleClick}>
        {variants.length > 1
          ? `Buy from ${formattedPrice()}`
          : `Add to Cart for ${formattedPrice()}`}
        <span className={styles.tooltip}>Added!</span>
      </button>
      <span
        role="log"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
        className="sr-only"
      >
        {liveRegionMessage}
      </span>
    </div>
  );
};

const ProductCard = ({ product }) => {

  // don’t display products without images
  if (!product.variants[0]?.image?.localFile?.childImageSharp?.fluid) {
    return null;
  }

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.slug}`} className={styles.cardLink}>
        <span className="sr-only">{product.title}</span>
      </Link>
      <Image
        fluid={product.variants[0]?.image?.localFile?.childImageSharp?.fluid}
        alt={product.title}
        className={styles.image}
      />
      <h3 className={styles.heading}>
        {product.title}
      </h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.buttons}>
        <div>
          <BuyButton variants={product.variants} slug={product.slug} title={product.title} />
        </div>
        <span className={styles.details}>
          Details <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
      {product.productType && <ProductTypeLabel className={styles.label} type={product.productType} />}
    </div>
  );
};

export default ProductCard;
