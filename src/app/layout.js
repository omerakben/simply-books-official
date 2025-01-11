import ClientProvider from '@/utils/context/ClientProvider';
import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] });

// Helper function to generate page title
const getPageTitle = (pathname) => {
  if (!pathname) return 'Simply Books';

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'Simply Books - Home';

  const pageName = segments[segments.length - 1]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `Simply Books - ${pageName}`;
};

// Helper function to generate page description
const getPageDescription = (pathname) => {
  if (!pathname) return 'Welcome to Simply Books - Your Digital Bookshelf';

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'Welcome to Simply Books - Your Digital Bookshelf';

  const pageName = segments[segments.length - 1]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const descriptions = {
    books: 'Browse and manage your book collection',
    authors: 'View and manage your favorite authors',
    profile: 'Manage your profile and settings',
    new: 'Add a new book to your collection',
    edit: 'Edit book details',
  };

  return descriptions[pageName.toLowerCase()] || `${pageName} page of Simply Books`;
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export async function generateMetadata({ params }) {
  const pathname = params?.slug?.join('/') || '';
  const title = getPageTitle(pathname);
  const description = getPageDescription(pathname);

  return {
    title,
    description,
    keywords: ['books', 'reading', 'library', 'bookshelf', 'authors', ...pathname.split('/').filter(Boolean)],
    openGraph: {
      title,
      description,
      url: `https://simply-books.com/${pathname}`,
      siteName: 'Simply Books',
      images: [
        {
          url: '/bookcase-logo.png',
          width: 800,
          height: 600,
          alt: 'Simply Books Logo',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/bookcase-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/bookcase-logo.png',
      apple: '/bookcase-logo.png',
    },
  };
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  };
}
