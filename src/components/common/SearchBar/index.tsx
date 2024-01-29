import React, { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';

import useDebounce from 'hooks/useDebounce';
import styles from './index.module.css';

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const { useDebouncedValue } = useDebounce();

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 700);

  useEffect(() => {
    if (shouldSearch) {
      const search = searchTerm.trim().replace(/[^A-Za-z]/g, '');
      if (search.length > 1 || search.length === 0) {
        handleSearch(search);
      }
    }

    return () => {
      setShouldSearch(false);
    };
  }, [debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!shouldSearch) setShouldSearch(true);
    const { value } = e.target;
    if (/^[A-Za-z\s]*$/.test(value) || value === '') {
      setSearchTerm(value);
    }
  };
  return (
    <div className={styles.searchbar__container}>
      <IoIosSearch className={styles.icon} />
      <input type="text" pattern="^[A-Za-z\s]+$" value={searchTerm} onChange={handleChange} placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
