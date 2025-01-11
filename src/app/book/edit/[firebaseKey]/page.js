'use client';

import { getSingleBook } from '@/api/bookData';
import BookForm from '@/components/forms/BookForm';
import Loading from '@/components/Loading';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

export default function EditBook({ params }) {
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleBook(firebaseKey).then((data) => {
      setEditItem(data);
      setLoading(false);
    });
  }, [firebaseKey]);

  if (loading) return <Loading />;

  return (
    <Container className="py-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <BookForm obj={editItem} user={user} />
        </div>
      </div>
    </Container>
  );
}

EditBook.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
