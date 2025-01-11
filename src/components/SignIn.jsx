import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>
        <Image src="/bookcase-logo.png" alt="Bookcase Logo" width={50} height={50} className="me-2" style={{ borderRadius: '50%' }} /> Bookcase
      </h1>
      <Button type="button" size="lg" className="copy-btn rounded-pill" onClick={signIn}>
        Sign with Google
      </Button>
    </div>
  );
}

export default Signin;
