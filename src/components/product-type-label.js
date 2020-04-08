/** @jsx jsx */
import { jsx } from 'theme-ui';

const ProductTypeLabel = ({ type, sx, ...rest }) => {
  return (
    <p
      sx={{
        bg: 'red',
        color: 'white',
        display: 'inline-block',
        fontSize: '0.75rem',
        lineHeight: 1,
        m: 0,
        p: 1,
        borderRadius: 6,
        fontWeight: 'bold',
        textTransform: 'capitalize',

        // TODO make this suck WAY less
        '&[data-type="stickers"]': {
          bg: 'labels.0',
        },
        '&[data-type="t-shirt"]': {
          bg: 'labels.1',
        },
        '&[data-type="tote bag"]': {
          bg: 'labels.2',
        },
        '&[data-type="drinkware"]': {
          bg: 'labels.3',
        },

        ...sx,
      }}
      {...rest}
      data-type={type}
    >
      {type}
    </p>
  );
};

export default ProductTypeLabel;
