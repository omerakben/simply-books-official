'use client';

import styles from '@/styles/BookCard.module.css';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { addToCart } from '../utils/cart';

// Formats the price with sale discount(10% off) if applicable.
// The formatted price is returned as a string.
const formatPrice = (price, isOnSale) => {
  if (typeof price !== 'string') return '0.00';
  const numPrice = parseFloat(price);
  return isOnSale ? (numPrice * 0.9).toFixed(2) : price;
};

// BookCard component displays a book's information in a card format
export default function BookCard({ bookObj, showAddToCart = true }) {
  // State to handle image loading errors
  const [imgError, setImgError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Handle image loading error
  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  // Get image source with fallback
  const getImageSource = useCallback(() => {
    if (imgError || !bookObj.image) {
      return '/images/book-placeholder.svg';
    }
    return bookObj.image;
  }, [imgError, bookObj.image]);

  // Handle adding to cart
  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault(); // Prevent navigation when clicking the button
      addToCart(bookObj);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
    },
    [bookObj],
  );

  return (
    <Card className={styles.bookCard}>
      {/* Image container with fixed height and hover effects */}
      <div className={styles.imageContainer}>
        <Image
          src={getImageSource()}
          alt={bookObj.title}
          className={styles.bookImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          onError={handleImageError}
          priority={false}
        />
        {/* Sale badge shown conditionally */}
        {bookObj.sale && (
          <Badge bg="danger" pill className={`position-absolute ${styles.saleTag}`}>
            On Sale
          </Badge>
        )}
      </div>

      {/* Card content */}
      <Card.Body className="p-3">
        <Card.Title className={styles.bookTitle}>{bookObj.title || 'Untitled Book'}</Card.Title>
        <Card.Subtitle className={`${styles.bookPrice} mb-2`}>${formatPrice(bookObj.price, bookObj.sale)}</Card.Subtitle>
        <Card.Text className={styles.bookDescription}>{bookObj.description || 'No description available'}</Card.Text>

        {showAddToCart && (
          <Button variant={addedToCart ? 'success' : 'primary'} className="w-100 mt-2" onClick={handleAddToCart} disabled={addedToCart}>
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

// PropTypes for type checking
BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  showAddToCart: PropTypes.bool,
};
