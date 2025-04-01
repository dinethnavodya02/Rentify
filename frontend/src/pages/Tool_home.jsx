import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/Navbar";

const Index_page = () => {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");

  useEffect(() => {
    axios.get("http://localhost:5000/tools").then((res) => {
      setTools(res.data);
    });
  }, []);

  // Filter tools based on search query
  const filteredTools = tools.filter((tool) =>
    tool.tool_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tools based on selected option
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.tool_title.localeCompare(b.tool_title);
      case "title-desc":
        return b.tool_title.localeCompare(a.tool_title);
      case "price-asc":
        return a.tool_price - b.tool_price;
      case "price-desc":
        return b.tool_price - a.tool_price;
      default:
        return 0;
    }
  });

  return (
    <>
      <NavBar />
      <div className=" mx-8 items-center my-8">
        <h1 className="text-4xl font-bold text-[#16423C] mb-4">
          Explore Tools
        </h1>
        <div className="flex">
          <div className="">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="ml-auto mr-4">
            <label
              htmlFor="sortOptions"
              className="p-3 mr-3 text-lg font-medium text-[#16423C]"
            >
              Sort by:
            </label>
            <select
              id="sortOptions"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 rounded border border-gray-300"
            >
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
        {sortedTools.length > 0 ? (
          sortedTools.map((tool) => (
            <Link
              to={`/tools_home/${tool._id}`}
              key={tool._id}
              className="bg-[#E9EFEC] flex flex-col rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative w-full h-48 bg-[#C4DAD2] flex items-center justify-center">
                {tool.tool_photos.length > 0 ? (
                  <img
                    src={`http://localhost:5000/uploads/${tool.tool_photos[0]}`}
                    alt={tool.tool_title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <p className="text-[#16423C] text-lg">No Image</p>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-[#16423C] mb-2">
                  {tool.tool_title}
                </h2>
                <div className="flex flex-wrap mb-2">
                  {tool.tool_perks.map((perk, index) => (
                    <span
                      key={index}
                      className="bg-[#5A8E74] text-white text-xs font-medium mr-2 mb-1 px-2 py-1 rounded"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[#16423C] text-right">
                  Rs. {tool.tool_price} / day
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-[#16423C] text-xl">No tools found.</p>
        )}
      </div>
    </>
  );
};

export default Index_page;
