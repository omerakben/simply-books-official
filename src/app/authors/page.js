'use client';

import { getAuthors } from '@/api/authorData';
import AuthorCard from '@/components/AuthorCard';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { useAuth } from '@/utils/context/authContext';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

export default function AuthorsPage() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const getAllAuthors = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    setError(null);
    try {
      const authorsData = await getAuthors(user.uid);
      setAuthors(authorsData);
      setFilteredAuthors(authorsData);
    } catch (err) {
      console.error('Error fetching authors:', err);
      setError(err instanceof Error ? err.message : 'Failed to load authors');
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    getAllAuthors();
  }, [getAllAuthors]);

  const handleSearch = useCallback(
    (term) => {
      if (!term.trim()) {
        setFilteredAuthors(authors);
        return;
      }

      const searchTerm = term.toLowerCase();
      const matchedAuthors = authors.filter((author) => author.first_name?.toLowerCase().includes(searchTerm) || author.last_name?.toLowerCase().includes(searchTerm) || author.email?.toLowerCase().includes(searchTerm));

      setFilteredAuthors(matchedAuthors);
    },
    [authors],
  );

  if (!user) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning" role="alert">
          Please sign in to view authors.
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
          <button type="button" onClick={getAllAuthors} className="btn btn-link p-0 ms-2">
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
          <h1 className="h2 mb-0">Authors</h1>
          <Link href="/author/new" passHref>
            <Button className="rounded-pill px-4 py-2" variant="success">
              <span className="d-flex align-items-center gap-2">
                <Image src="/images/add.svg" alt="Add Author" width={24} height={24} /> Add An Author
              </span>
            </Button>
          </Link>
        </div>

        <Search onSearch={handleSearch} type="authors" className="mb-4" />

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
      </Container>
    </div>
  );
}
