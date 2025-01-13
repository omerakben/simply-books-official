'use client';

import { getAuthors } from '@/api/authorData';
import { getBooks } from '@/api/bookData';
import BookCard from '@/components/BookCard';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { useAuth } from '@/utils/context/authContext';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

export default function BooksPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const getAllData = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    setError(null);
    try {
      const [booksData, authorsData] = await Promise.all([getBooks(user.uid), getAuthors(user.uid)]);
      setBooks(booksData);
      setFilteredBooks(booksData);
      setAuthors(authorsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const handleSearch = useCallback(
    (term) => {
      if (!term.trim()) {
        setFilteredBooks(books);
        return;
      }

      const searchTerm = term.toLowerCase();
      const matchedBooks = books.filter((book) => book.title?.toLowerCase().includes(searchTerm) || book.description?.toLowerCase().includes(searchTerm));

      setFilteredBooks(matchedBooks);
    },
    [books],
  );

  if (!user) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning" role="alert">
          Please sign in to view books.
        </div>
      </Container>
    );
  }

  if (loading) return <Loading />;

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button type="button" onClick={getAllData} className="btn btn-link p-0 ms-2">
            Try again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">Books</h1>
          {authors.length > 0 && (
            <Link href="/book/new" passHref>
              <Button className="rounded-pill px-4 py-2" variant="success">
                <span className="d-flex align-items-center gap-2">
                  <Image src="/images/add.svg" alt="Add Book" width={24} height={24} /> Add A Book
                </span>
              </Button>
            </Link>
          )}
        </div>

        <Search onSearch={handleSearch} type="books" className="mb-4" />

        {filteredBooks.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted fs-5">
              {(() => {
                if (books.length === 0) {
                  if (authors.length === 0) {
                    return (
                      <>
                        You need to add authors before adding books! <br />
                        Click to{' '}
                        <Link href="/authors" className="text-decoration-none">
                          Add Your First Author
                        </Link>
                      </>
                    );
                  }
                  return (
                    <>
                      No books found. Add some books to your collection! <br />
                      Click to{' '}
                      <Link href="/book/new" className="text-decoration-none">
                        Add Your First Book
                      </Link>
                    </>
                  );
                }
                return 'No books match your search.';
              })()}
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredBooks.map((book) => (
              <div key={book.firebaseKey} className="col-12 col-md-6 col-lg-4">
                <Link href={`/book/${book.firebaseKey}`} className="text-decoration-none">
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
