import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          urlImage={image.webformatURL}
          tagImage={image.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};
