import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Badge, Card } from 'react-bootstrap';

// AuthorCard component displays an author's information in a card format
function AuthorCard({ authorObj }) {
  // State to handle image loading errors
  const [imgError, setImgError] = useState(false);

  // Handle image loading error
  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  // Get the image source with error handling
  const getImageSource = () => {
    if (imgError) return '/author-avatar.png';
    if (authorObj.image && authorObj.image.startsWith('http')) return authorObj.image;
    return '/author-avatar.png';
  };

  return (
    <Card className="h-100 border-0 shadow-sm author-card">
      {/* Image container with fixed height and hover effects */}
      <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
        <Image src={getImageSource()} alt={`${authorObj.first_name || ''} ${authorObj.last_name || ''}`.trim() || 'Author'} fill style={{ objectFit: 'cover' }} className="author-image" onError={handleImageError} priority={false} />
        {/* Favorite badge shown conditionally */}
        {authorObj.favorite && (
          <Badge bg="success" pill className="position-absolute top-0 end-0 m-3 px-3 py-2">
            Favorite
          </Badge>
        )}
      </div>

      {/* Card content */}
      <Card.Body className="text-center p-4">
        <Card.Title as="h3" className="h4 mb-2">
          {`${authorObj.first_name || ''} ${authorObj.last_name || ''}`.trim() || 'Unknown Author'}
        </Card.Title>
        <Card.Text className="text-muted mb-0">{authorObj.email || 'No email provided'}</Card.Text>
      </Card.Body>
    </Card>
  );
}

// PropTypes for type checking
AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default AuthorCard;
