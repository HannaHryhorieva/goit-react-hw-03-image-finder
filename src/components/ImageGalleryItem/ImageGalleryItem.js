import PropTypes from 'prop-types';
export default function ImageGalleryItem({
  id,
  urlImage,
  tagImage,
  value,
  onClick,
}) {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img
        id={id}
        src={urlImage}
        alt={tagImage}
        className="ImageGalleryItem-image"
        value={value}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  urlImage: PropTypes.string,
  tagImage: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};
