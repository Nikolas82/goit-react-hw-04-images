import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchImages, setSearchImages] = useState('');

  const handleSearchImages = e => {
    setSearchImages(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchImages.trim() === '') {
      toast.error('Please try again!');
      return;
    }
    onSubmit(searchImages);
    setSearchImages('');
  };

  return (
    <>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchImages}
            onChange={handleSearchImages}
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
