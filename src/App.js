import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Searchbar from './components/Searchbar/Searchbar';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal/Modal';
import apiService from './apiServiсe/apiService';

class App extends Component {
  state = {
    page: 1,
    searchValue: '',
    images: [],
    loading: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };
  componentDidUpdate(prevProps, prevState) {
    const searchValue = this.state.searchValue;
    const page = this.state.page;
    if (prevState.searchValue !== searchValue) {
      this.setState({ loading: true });
      setTimeout(() => {
        apiService(searchValue, page)
          .then(respons => this.setState({ images: respons.hits }))
          .catch(error => toast.error(`${error}`))
          .finally(this.setState({ loading: false }));
      }, 1000);
    }
    if (prevState.page !== page) {
      this.setState({ loading: true });
      apiService(searchValue, page)
        .then(respons =>
          this.setState({ images: [...this.state.images, ...respons.hits] }),
        )
        .catch(error => toast.error(`${error}`))
        .finally(this.setState({ loading: false }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  onHandleSearch = searchValue => {
    // this.setState({ images: [] });
    this.setState({ page: 1 });
    this.setState({ searchValue });
  };
  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = e => {
    this.toggleModal();
    const idImage = Number(e.target.id);
    const image = this.state.images.find(image => image.id === idImage);

    this.setState({ largeImageURL: image.largeImageURL });
    this.setState({ tags: image.tags });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onHandleSearch} />
        <Loader
          className="Loader"
          visible={this.state.loading}
          type="Grid"
          color="#3f51b5"
          height={200}
          width={200}
        />

        <ImageGallery images={this.state.images} onClick={this.openModal} />

        {this.state.images.length > 0 && (
          <div>
            <Button onClick={this.onLoadMore} />
          </div>
        )}
        {this.state.showModal && (
          <Modal
            imageUrl={this.state.largeImageURL}
            tags={this.state.tags}
            onClose={this.toggleModal}
          />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
