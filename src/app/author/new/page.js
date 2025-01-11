import AuthorForm from '@/components/forms/AuthorForm';
import { Container } from 'react-bootstrap';

export default function AddAuthor() {
  return (
    <Container className="py-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <AuthorForm />
        </div>
      </div>
    </Container>
  );
}
