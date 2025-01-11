'use client';

import BookForm from '@/components/forms/BookForm';
import { Container } from 'react-bootstrap';

// create a reusable form to add/edit book and render in this view

export default function AddBook() {
  return (
    <Container className="py-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <BookForm />
        </div>
      </div>
    </Container>
  );
}
