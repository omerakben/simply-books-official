'use client';

import { getSingleAuthor } from '@/api/authorData';
import AuthorForm from '@/components/forms/AuthorForm';
import Loading from '@/components/Loading';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

export default function EditAuthorPage({ params }) {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleAuthor(firebaseKey).then((data) => {
      setAuthor(data);
      setLoading(false);
    });
  }, [firebaseKey]);

  if (loading) return <Loading />;

  return (
    <Container className="py-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <AuthorForm obj={author} />
        </div>
      </div>
    </Container>
  );
}

EditAuthorPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
