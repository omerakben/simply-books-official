'use client';

import { getSingleBook } from '@/api/bookData';
import BookForm from '@/components/forms/BookForm';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function EditBook({ params }) {
  const [editItem, setEditItem] = useState({});
  const { user } = useAuth();
  // grab the firebasekey
  const { firebaseKey } = params;

  // make a call to the API to get the book data
  useEffect(() => {
    getSingleBook(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (
    <div className="container">
      <h1>Edit Book</h1>
      <BookForm obj={editItem} user={user} />
    </div>
  );
}

EditBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
