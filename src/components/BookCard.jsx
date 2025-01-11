'use client';

import styles from '@/styles/BookCard.module.css';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

// BookCard component displays a book's information in a card format
export default function BookCard({ bookObj }) {
  // State to handle image loading errors
  const [imgError, setImgError] = useState(false);

  // Handle image loading error
  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  return (
    <Card className={styles.bookCard}>
      {/* Image container with fixed height and hover effects */}
      <div className={styles.imageContainer}>
        <Image
          src={imgError ? '/Books.png' : bookObj.image}
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
        <Card.Subtitle className={`${styles.bookPrice} mb-2`}>${typeof bookObj.price === 'string' ? bookObj.price : '0.00'}</Card.Subtitle>
        <Card.Text className={styles.bookDescription}>{bookObj.description || 'No description available'}</Card.Text>
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
};
