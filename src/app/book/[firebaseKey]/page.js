'use client';

import { viewBookDetails } from '@/api/mergedData';
import Loading from '@/components/Loading';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewBookDetails(firebaseKey).then(setBookDetails);
    setLoading(false);
  }, [firebaseKey]);

  if (loading) return <Loading />;

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <div className="row">
            <div className="col-md-4">
              <Image src={bookDetails.image} alt={bookDetails.title} width={300} height={400} className="rounded-3 w-100 h-auto" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-2 mb-3">
                <h1 className="display-6 fw-bold mb-0">{bookDetails.title}</h1>
                {bookDetails.favorite && <Image src="/images/favorite.svg" alt="Favorite" width={24} height={24} />}
              </div>
              {bookDetails.sale && (
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Image src="/images/on-sale.svg" alt="On Sale" width={24} height={24} />
                  <span className="badge bg-danger">On Sale</span>
                </div>
              )}
              <p className="fs-4 text-success fw-bold mb-3">${bookDetails.price}</p>
              <p className="fs-5 mb-4">{bookDetails.description}</p>
              <div className="d-flex gap-2">
                <span className="badge bg-secondary d-flex align-items-center gap-2">
                  <Image src="/images/add-author.svg" alt="Author" width={24} height={24} />
                  {bookDetails.author}
                </span>
                {bookDetails.email && (
                  <span className="badge bg-secondary">
                    📧{' '}
                    <a href={`mailto:${bookDetails.email}`} className="text-white text-decoration-none">
                      {bookDetails.email}
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

ViewBook.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
