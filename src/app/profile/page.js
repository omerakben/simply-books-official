'use client';

import { useAuth } from '@/utils/context/authContext';
import Image from 'next/image';
import { Card, Container } from 'react-bootstrap';

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <div className="text-center">
            <Image src={user.photoURL} alt={user.displayName} width={150} height={150} className="rounded-circle mb-3" />
            <h1 className="display-6 fw-bold mb-2">{user.displayName}</h1>
            <p className="fs-5 text-muted mb-4">{user.email}</p>
            <div className="d-flex justify-content-center gap-3">
              <div className="text-center">
                <h5 className="fw-bold mb-1">Last Login</h5>
                <p className="text-muted">{new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <h5 className="fw-bold mb-1">Member Since</h5>
                <p className="text-muted">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
