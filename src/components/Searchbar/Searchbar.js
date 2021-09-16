import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };
  handleChange = e => {
    this.setState({ searchValue: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchValue.trim() === '') {
      return toast.error('Введите поисковый запрос!');
    }
    this.props.onSubmit(this.state.searchValue.toLowerCase());
    this.setState({ searchValue: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            value={this.state.searchValue}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
