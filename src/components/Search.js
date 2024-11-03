
import React from 'react';

function Search({ searchTerm, setSearchTerm, handleSearch, categories, filterByCategory }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Ieškoti pagal pavadinimą..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleSearch}
      />
      <select onChange={(e) => filterByCategory(e.target.value)}>
        <option value="">Pasirinkite kategoriją</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Search