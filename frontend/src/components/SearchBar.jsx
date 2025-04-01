import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="m-6">
      <input
        type="text"
        placeholder="Search for tools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" p-3 border border-[#6A9C89] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
      />
    </div>
  );
};

export default SearchBar;
