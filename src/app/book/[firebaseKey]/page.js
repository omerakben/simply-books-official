'use client';

import React, { useEffect, useState } from 'react';
import { viewBookDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewBookDetails(firebaseKey).then(setBookDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name}
          {bookDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${bookDetails.authorObject?.email}`}>{bookDetails.authorObject?.email}</a>
        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>{bookDetails.sale ? `🏷️ Sale $${bookDetails.price}` : `$${bookDetails.price}`}</p>
      </div>
    </div>
  );
}

ViewBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
