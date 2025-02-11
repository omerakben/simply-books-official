/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { getAuthors } from '@/api/authorData';
import { getBooks } from '@/api/bookData';
import AuthorCard from '@/components/AuthorCard';
import BookCard from '@/components/BookCard';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const loadData = useCallback(async () => {
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
      setFilteredAuthors(authorsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = useCallback(
    (term) => {
      if (!term.trim()) {
        setFilteredBooks(books);
        setFilteredAuthors(authors);
        return;
      }

      const searchTerm = term.toLowerCase();

      const matchedBooks = books.filter((book) => book.title?.toLowerCase().includes(searchTerm) || book.description?.toLowerCase().includes(searchTerm));
      const matchedAuthors = authors.filter((author) => author.first_name?.toLowerCase().includes(searchTerm) || author.last_name?.toLowerCase().includes(searchTerm) || author.email?.toLowerCase().includes(searchTerm));

      setFilteredBooks(matchedBooks);
      setFilteredAuthors(matchedAuthors);
    },
    [books, authors],
  );

  if (!user) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>
            <h4 className="alert-heading">Authentication Required</h4>
            <p className="mb-0">Please sign in to view your collection.</p>
          </div>
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
          <button type="button" onClick={loadData} className="btn btn-link p-0 ms-2">
            Try again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <Search onSearch={handleSearch} type="all" className="mb-4" />

        {/* Books Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 mb-0">My Books</h2>
          </div>

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
        </section>

        {/* Authors Section */}
        <section>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 mb-0">My Authors</h2>
          </div>

          {filteredAuthors.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted fs-5">
                {authors.length === 0 ? (
                  <>
                    No authors found. Add some authors to your collection! <br />
                    Click to{' '}
                    <Link href="/author/new" className="text-decoration-none">
                      Add Your First Author
                    </Link>
                  </>
                ) : (
                  'No authors match your search.'
                )}
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredAuthors.map((author) => (
                <div key={author.firebaseKey} className="col-12 col-md-6 col-lg-4">
                  <Link href={`/author/${author.firebaseKey}`} className="text-decoration-none">
                    <AuthorCard authorObj={author} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

export default Home;
