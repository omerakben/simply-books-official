'use client';

import { deleteBook } from '@/api/bookData';
import { viewBookDetails } from '@/api/mergedData';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { firebaseKey } = params;

  const deleteThisBook = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(firebaseKey).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    viewBookDetails(firebaseKey).then((data) => {
      setBookDetails(data);
      setLoading(false);
    });
  }, [firebaseKey]);

  if (loading) return <Loading />;

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold mb-0">{bookDetails.title}</h1>
            <div className="d-flex gap-2">
              <Link href={`/book/edit/${firebaseKey}`} passHref>
                <Button variant="warning">Edit</Button>
              </Link>
              <Button variant="danger" onClick={deleteThisBook}>
                Delete
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Image src={bookDetails.image || '/bookcase-logo.png'} alt={bookDetails.title} width={300} height={400} className="rounded-3 w-100 h-auto" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-8">
              <div className="d-flex flex-wrap gap-3 mb-4">
                {bookDetails.favorite && (
                  <div className="d-flex align-items-center gap-2">
                    <Image src="/images/favorite.svg" alt="Favorite" width={24} height={24} />
                    <span className="badge bg-success">Favorite</span>
                  </div>
                )}
                {bookDetails.sale && (
                  <div className="d-flex align-items-center gap-2">
                    <Image src="/images/on-sale.svg" alt="On Sale" width={24} height={24} />
                    <span className="badge bg-danger">On Sale</span>
                  </div>
                )}
              </div>
              <p className="fs-4 text-success fw-bold mb-3">${bookDetails.price || '0.00'}</p>
              <p className="fs-5 mb-4">{bookDetails.description || 'No description available'}</p>

              {/* Author Information */}
              {bookDetails.authorObject ? (
                <Link href={`/author/${bookDetails.authorObject.firebaseKey}`} className="text-decoration-none">
                  <span className="badge bg-secondary d-inline-flex align-items-center gap-2">
                    <Image src="/images/add-author.svg" alt="Author" width={24} height={24} />
                    {`${bookDetails.authorObject.first_name} ${bookDetails.authorObject.last_name}`}
                  </span>
                </Link>
              ) : (
                <span className="badge bg-secondary d-inline-flex align-items-center gap-2">
                  <Image src="/images/add-author.svg" alt="Author" width={24} height={24} />
                  No Author Assigned
                </span>
              )}
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
