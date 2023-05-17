import React, { useState, useEffect } from 'react';

import { queryImages } from './queryImages';
import { ToastContainer } from 'react-toastify';
import { Loader } from './loader/Loader';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { Modal } from './modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (searchImages !== '') fetchImages(searchImages, page);
  }, [searchImages, page]);

  const fetchImages = async (searchImages, page) => {
    try {
      setIsLoading(true);
      const data = await queryImages(searchImages, page);

      setImages(prevImage => [...prevImage, ...data.hits]);
      setTotal(data.totalHits);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = searchImages => {
    setSearchImages(searchImages);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = largeImageURL => {
    setShowModal(true);
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const totalPage = total / images.length;

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {isLoading && <Loader />}
      {totalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={handleLoadMore} />
      )}

      <ToastContainer autoClose={3000} />

      {showModal && (
        <Modal src={selectedImage} alt="" onClick={handleCloseModal} />
      )}
    </div>
  );
};
