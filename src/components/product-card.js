/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link, navigate } from 'gatsby';
import Image from 'gatsby-image';

import ProductTypeLabel from './product-type-label';
import { useCart } from '../context/cart-context';

const BuyButton = ({ variants, slug }) => {
  const { addItemToCart } = useCart();
  const lowestPrice = variants.sort(
    (a, b) => a.priceV2.amount - b.priceV2.amount,
  )[0].priceV2;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: lowestPrice.currencyCode,
  }).format(lowestPrice.amount);

  const handleClick = (event) => {
    event.preventDefault();

    if (variants.length > 1) {
      navigate(`/product/${slug}`);
      return;
    }

    addItemToCart({
      variantId: variants[0].shopifyId,
      quantity: 1,
    });
  };

  return (
    <button
      sx={{
        color: 'heading',
        bg: '#e9ebeb',
        border: 0,
        borderRadius: 6,
        fontSize: '16px',
        fontWeight: 600,
        py: '6px',
        px: '8px',
        width: 'auto',
      }}
      onClick={handleClick}
    >
      {variants.length > 1 ? `Buy from ${formatted}` : `Buy for ${formatted}`}
    </button>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div
      sx={{
        position: 'relative',
        bg: 'white',
        border: '5px solid white',
        borderRadius: 8,
        boxShadow: (t) => `
          0 0 0 1px ${t.colors.grayDarkAlpha},
          0 4px 4px ${t.colors.grayDarkAlpha}
        `,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        mb: '1rem',
        overflow: 'hidden',
        pb: '0.75rem',
        '::before': {
          position: 'absolute',
          top: 0,
          left: '-75%',
          zIndex: 2,
          display: 'block',
          content: '""',
          width: '50%',
          height: '100%',
          pointerEvents: 'none',
          background: `
            linear-gradient(
              to right,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,.3) 100%
            )
          `,
          transform: 'skewX(-25deg)',
        },
        ':hover::before': {
          animation: 'shine .75s',
        },
      }}
    >
      <Link to={`/product/${product.slug}`}>
        <Image
          fluid={product.variants[0].image.localFile.childImageSharp.fluid}
          alt={product.title}
          sx={{
            width: '100%',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}
        />
      </Link>
      <h2 sx={{ color: 'heading', m: 0, p: '8px' }}>
        <Link
          sx={{ color: 'inherit', textDecoration: 'none' }}
          to={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
      </h2>
      <p sx={{ m: 0, mb: '8px', px: '8px' }}>{product.description}</p>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          alignItems: 'baseline',
          mt: 'auto',
          pt: '8px',
          px: '8px',
        }}
      >
        <div>
          <BuyButton variants={product.variants} slug={product.slug} />
        </div>
        <Link
          to={`/product/${product.slug}`}
          sx={{
            color: 'link',
            fontSize: 14,
            textAlign: 'center',
            textDecoration: 'none',
          }}
          href="#TODO-product-detail-page"
        >
          Details &rarr;
        </Link>
      </div>
      <ProductTypeLabel
        sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
        }}
        type={product.productType}
      />
      {/* {product.variants.length > 1 &&
        product.variants.map(variant => (
          <p key={variant.title}>Option: {variant.title}</p>
        ))} */}
    </div>
  );
};

export default ProductCard;
