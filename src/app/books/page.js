'use client';

import { getBooks } from '@/api/bookData';
import BookCard from '@/components/BookCard';
import Loading from '@/components/Loading';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getAllBooks = useCallback(() => {
    setLoading(true);
    getBooks(user.uid).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, [user.uid]);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white min-vh-100">
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold mb-4">Books</h1>
          <Link href="/book/new" passHref>
            <Button variant="success" className="rounded-pill px-4 py-2">
              Add New Book
            </Button>
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {books.map((book) => (
            <div key={book.firebaseKey} className="col">
              <Link href={`/book/${book.firebaseKey}`} className="text-decoration-none h-100 d-block">
                <BookCard bookObj={book} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
