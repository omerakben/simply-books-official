/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import BookCard from '../components/BookCard';
import { useAuth } from '../utils/context/authContext';

const SKELETON_ITEMS = ['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5', 'skeleton-6'];

function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const loadBooks = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    setError(null);
    try {
      const data = await getBooks(user.uid);
      const filteredBooks = searchQuery ? data.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.description?.toLowerCase().includes(searchQuery.toLowerCase())) : data;
      setBooks(filteredBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err instanceof Error ? err.message : 'Failed to load books');
    } finally {
      setLoading(false);
    }
  }, [user?.uid, searchQuery]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  if (!user) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>
            <h4 className="alert-heading">Authentication Required</h4>
            <p className="mb-0">Please sign in to view books.</p>
            <Link href="/" className="alert-link">
              Return to Home
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="row g-4">
          {SKELETON_ITEMS.map((id) => (
            <div key={id} className="col-4 col-md-6 col-lg-4">
              <div className="card h-100 border-0 rounded-4 overflow-hidden">
                <div className="bg-light" style={{ height: '300px' }} />
                <div className="card-body">
                  <div className="bg-light mb-2" style={{ height: '24px', width: '70%' }} />
                  <div className="bg-light mb-4" style={{ height: '20px', width: '100%' }} />
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="bg-light" style={{ height: '24px', width: '60px' }} />
                    <div className="bg-light" style={{ height: '38px', width: '120px' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>
            <h4 className="alert-heading">Error loading books</h4>
            <p className="mb-0">{error}</p>
            <button type="button" onClick={() => window.location.reload()} className="btn btn-link p-0 text-danger">
              Try again
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">{searchQuery ? `Search Results for "${searchQuery}"` : 'My Books'}</h1>
          <Link href="/book/new" passHref>
            <Button variant="success" className="rounded-pill px-4">
              Add New Book
            </Button>
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fs-5">{searchQuery ? `No books found matching "${searchQuery}"` : 'No books found. Add some books to your collection!'}</p>
          </div>
        ) : (
          <div className="row g-4">
            {books.map((book) => (
              <div key={book.firebaseKey} className="col-12 col-md-6 col-lg-4">
                <Link href={`/book/edit/${book.firebaseKey}`} className="text-decoration-none">
                  <BookCard bookObj={book} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
