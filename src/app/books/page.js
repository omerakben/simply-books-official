'use client';

import { getAuthors } from '@/api/authorData';
import { getBooks } from '@/api/bookData';
import BookCard from '@/components/BookCard';
import Loading from '@/components/Loading';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getAllData = useCallback(() => {
    setLoading(true);
    Promise.all([getBooks(user.uid), getAuthors(user.uid)]).then(([booksData, authorsData]) => {
      setBooks(booksData);
      setAuthors(authorsData);
      setLoading(false);
    });
  }, [user.uid]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white min-vh-100">
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold mb-4">Books</h1>
          {authors.length === 0 ? (
            <p className="text-muted fs-5">
              You need to add authors before adding books! <br />
              Click to{' '}
              <Link href="/authors" className="text-decoration-none">
                Add Your First Author
              </Link>
            </p>
          ) : (
            <>
              <Link href="/book/new" passHref>
                <Button variant="success" className="rounded-pill px-4 py-2">
                  Add New Book
                </Button>
              </Link>
              {books.length === 0 && <p className="text-muted fs-5 mt-3">No books found. Add a book to your collection!</p>}
            </>
          )}
        </div>
        {books.length > 0 && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {books.map((book) => (
              <div key={book.firebaseKey} className="col">
                <Link href={`/book/${book.firebaseKey}`} className="text-decoration-none h-100 d-block">
                  <BookCard bookObj={book} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
