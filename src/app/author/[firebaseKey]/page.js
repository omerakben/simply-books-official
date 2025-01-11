'use client';

import { deleteAuthorBooks, viewAuthorDetails } from '@/api/mergedData';
import BookCard from '@/components/BookCard';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { firebaseKey } = params;

  const deleteThisAuthor = () => {
    if (window.confirm(`This will also delete all ${authorDetails.first_name} ${authorDetails.last_name}'s books!`)) {
      deleteAuthorBooks(firebaseKey).then(() => {
        router.push('/authors');
      });
    }
  };

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then((data) => {
      setAuthorDetails(data);
      setLoading(false);
    });
  }, [firebaseKey]);

  if (loading) return <Loading />;

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold mb-0">
              {authorDetails.first_name} {authorDetails.last_name}
            </h1>
            <div className="d-flex gap-2">
              <Link href={`/author/edit/${firebaseKey}`} passHref>
                <Button variant="warning">Edit</Button>
              </Link>
              <Button variant="danger" onClick={deleteThisAuthor}>
                Delete
              </Button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Image src={authorDetails.image || '/author-avatar.png'} alt={`${authorDetails.first_name} ${authorDetails.last_name}`} width={300} height={400} className="rounded-3 w-100 h-auto" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-8">
              {authorDetails.favorite && (
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Image src="/images/favorite.svg" alt="Favorite" width={24} height={24} />
                  <span className="badge bg-success">Favorite Author</span>
                </div>
              )}
              <p className="fs-5 mb-2">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${authorDetails.email}`} className="text-decoration-none">
                  {authorDetails.email}
                </a>
              </p>

              {/* Author's Books Section */}
              <div className="mt-5">
                <h2 className="h4 mb-4">
                  Books by {authorDetails.first_name} {authorDetails.last_name}
                </h2>
                {authorDetails.books?.length > 0 ? (
                  <div className="row g-4">
                    {authorDetails.books.map((book) => (
                      <div key={book.firebaseKey} className="col-12 col-md-6">
                        <Link href={`/book/${book.firebaseKey}`} className="text-decoration-none">
                          <BookCard bookObj={book} />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No books found for this author.</p>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
