import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    return (
        <img className={className} src={src} ref={ref} alt={alt} {...props} />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
};
export default Image;
