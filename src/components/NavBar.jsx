/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import addAuthorIcon from '../../public/images/add-author.svg';
import booksIcon from '../../public/images/books.svg';
import homeIcon from '../../public/images/home.svg';
import logoutIcon from '../../public/images/logout.svg';
import profileIcon from '../../public/images/profile.svg';
import { signOutUser } from '../utils/auth';

// Navigation bar component with responsive design
export default function NavBar() {
  // State to handle image loading errors
  const [imgError, setImgError] = useState(false);

  // Handle image loading error
  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  // Array of navigation links for easy maintenance
  const navLinks = [
    { href: '/', label: 'Home', icon: homeIcon },
    { href: '/authors', label: 'Authors', icon: addAuthorIcon },
    { href: '/books', label: 'Books', icon: booksIcon },
    { href: '/profile', label: 'Profile', icon: profileIcon },
  ];

  // Handle sign out with error handling
  const handleSignOut = useCallback(async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, []);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-2 shadow-sm">
      <Container>
        {/* Brand logo and name */}
        <Link href="/" passHref>
          <Navbar.Brand className="d-flex align-items-center">
            <Image src={imgError ? '/bookcase-logo-alt.png' : '/bookcase-logo.png'} alt="Bookcase Logo" width={50} height={50} className="rounded-circle" onError={handleImageError} priority />
            <span className="ms-2 fw-bold">Bookcase</span>
          </Navbar.Brand>
        </Link>

        {/* Responsive toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible navigation content */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Main navigation links */}
          <Nav className="me-auto gap-4">
            {navLinks.map(({ href, label, icon }) => (
              <Link key={href} href={href} passHref legacyBehavior>
                <Nav.Link className="d-flex align-items-center">
                  <Image src={icon} alt={label} width={30} height={30} className="me-2" />
                  {label}
                </Nav.Link>
              </Link>
            ))}
          </Nav>

          {/* Sign out button */}
          <Button variant="warning" onClick={handleSignOut} className="d-flex align-items-center gap-2 rounded-pill">
            <Image src={logoutIcon} alt="Sign Out" width={30} height={30} />
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
