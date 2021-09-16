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
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ loading: true });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=22463604-709d4d80ecefd06266ae1aa7f&image_type=photo&orientation=horizontal&per_page=12`,
        )
          .then(r => r.json())
          .then(respons => this.setState({ images: respons.hits }))
          .catch(error => toast.error(`${error}`))
          .finally(this.setState({ loading: false }));
      }, 1000);
    }
    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=22463604-709d4d80ecefd06266ae1aa7f&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(r => r.json())
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
          ></Modal>
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
