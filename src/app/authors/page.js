'use client';

import { getAuthors } from '@/api/authorData';
import AuthorCard from '@/components/AuthorCard';
import Loading from '@/components/Loading';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getAllAuthors = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getAuthors(user.uid);
      setAuthors(data);
    } catch (err) {
      setError('Failed to load authors');
      console.error('Error loading authors:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    getAllAuthors();
  }, [getAllAuthors]);

  if (!user) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning" role="alert">
          Please sign in to view authors.
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5">
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button type="button" className="btn btn-link p-0 ms-2" onClick={getAllAuthors}>
            Try again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="authors-page py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="display-4 fw-bold mb-0">Authors</h1>
          <Link href="/author/new" passHref>
            <Button variant="success" className="rounded-pill px-4 py-2">
              Add New Author
            </Button>
          </Link>
        </div>

        {authors.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fs-5">No authors found. Add some authors to your collection!</p>
            <Link href="/author/new" passHref>
              <Button variant="success" className="rounded-pill px-4">
                Add New Author
              </Button>
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {authors.map((author) => (
              <div key={author.firebaseKey} className="col-12 col-md-6 col-lg-4">
                <Link href={`/author/edit/${author.firebaseKey}`} className="text-decoration-none">
                  <AuthorCard authorObj={author} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
