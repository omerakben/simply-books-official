'use client';

import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function Search({ onSearch, type = 'all', className = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      onSearch(term.toLowerCase());
    },
    [onSearch],
  );

  const getPlaceholder = () => {
    if (type === 'books') return 'Search books...';
    if (type === 'authors') return 'Search authors...';
    return 'Search books and authors...';
  };

  return (
    <div className={`search-container ${className}`}>
      <InputGroup className="mb-4">
        <InputGroup.Text className="bg-white border-end-0 rounded-pill-start ps-4">
          <Image src="/images/search-icon.svg" alt="Search" width={30} height={30} />
        </InputGroup.Text>
        <Form.Control type="text" placeholder={getPlaceholder()} value={searchTerm} onChange={handleSearch} className="border-start-0 shadow-none rounded-pill-end py-3 pe-4" style={{ fontSize: '1.2rem' }} />
      </InputGroup>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['all', 'books', 'authors']),
  className: PropTypes.string,
};
