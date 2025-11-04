import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange }) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <InputGroup size="lg">
      <InputGroup.Text>
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="메모 검색..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      {searchQuery && (
        <Button variant="outline-secondary" onClick={handleClearSearch}>
          <i className="bi bi-x"></i>
        </Button>
      )}
    </InputGroup>
  );
}

export default SearchBar;
