/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const BuyButton = ({ variants }) => {
  // TODO write actual logic to find lowest price
  const lowestPrice = variants[0].priceV2;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: lowestPrice.currencyCode,
  }).format(lowestPrice.amount);

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
    >
      {variants.length > 1 ? `Buy from ${formatted}` : `Buy for ${formatted}`}
    </button>
  );
};

const ProductCard = ({ product }) => {
  // TODO: improve link color

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
        pb: '0.75rem',
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
          <BuyButton variants={product.variants} />
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
      <p
        sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
          bg: 'red',
          color: 'white',
          fontSize: '0.75rem',
          lineHeight: 1,
          m: 0,
          p: 1,
          borderRadius: 6,
          fontWeight: 'bold',
          textTransform: 'capitalize',

          // TODO make this suck WAY less
          '&[data-type="stickers"]': {
            bg: 'blue',
          },
          '&[data-type="t-shirt"]': {
            bg: 'purple',
          },
          '&[data-type="tote bag"]': {
            bg: 'darkorange',
          },
        }}
        data-type={product.productType}
      >
        {product.productType}
      </p>
      {/* {product.variants.length > 1 &&
        product.variants.map(variant => (
          <p key={variant.title}>Option: {variant.title}</p>
        ))} */}
    </div>
  );
};

export default ProductCard;
