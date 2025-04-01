import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PhotosUploder from "../components/PhotosUploder";
import ToolPerks from "../components/ToolPerks";
import NavBar from "../components/AdminNavBar";
const ToolForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [maxDays, setMaxDays] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    axios.get("http://localhost:5000/tools/" + id).then((response) => {
      const { data } = response;
      setTitle(data.tool_title);
      setAddedPhotos(data.tool_photos);
      setDescription(data.tool_description);
      setPerks(data.tool_perks);
      setPrice(data.tool_price);
      setMaxDays(data.tool_maxDays);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // MaxDays validation
    if (maxDays < 1 || maxDays > 50) {
      setErrorMessage("Max rent days must be between 1 and 50.");
      return;
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/tools/${id}`, {
          tool_title: title,
          tool_description: description,
          tool_photos: addedPhotos,
          tool_perks: perks,
          tool_price: price,
          tool_maxDays: maxDays,
        });
      } else {
        await axios.post("http://localhost:5000/tools", {
          tool_title: title,
          tool_description: description,
          tool_photos: addedPhotos,
          tool_perks: perks,
          tool_price: price,
          tool_maxDays: maxDays,
        });
      }

      setRedirect("/rent_admin_home");
    } catch (error) {
      console.error("Error submitting tool:", error);
      alert("An error occurred while submitting the tool. Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-[#E9EFEC] p-12 rounded-lg shadow-lg">
          <h2 className="text-[#16423C] text-3xl font-bold mb-8">
            {id ? "Edit Tool" : "Add New Tool"}
          </h2>
          {errorMessage && (
            <div className="text-red-600 mb-4 font-medium">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#16423C] font-medium mb-2">
                Tool Title
              </label>
              <input
                type="text"
                name="tool_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-[#6A9C89] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
              />
            </div>

            <div>
              <label className="block text-[#16423C] font-medium mb-2">
                Tool Photos
              </label>
              <PhotosUploder
                addedPhotos={addedPhotos}
                onChange={setAddedPhotos}
              />
            </div>

            <div>
              <label className="block text-[#16423C] font-medium mb-2">
                Tool Description
              </label>
              <textarea
                name="tool_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-4 border border-[#6A9C89] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
              ></textarea>
            </div>

            <ToolPerks selected={perks} onChange={setPerks} />

            <div>
              <label className="block text-[#16423C] font-medium mb-2">
                Price per Day
              </label>
              <input
                name="tool_price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-4 border border-[#6A9C89] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
              />
            </div>
            <div>
              <label className="block text-[#16423C] font-medium mb-2">
                Number of maximum rent days
              </label>
              <input
                type="number"
                name="tool_maxDays"
                value={maxDays}
                onChange={(e) => setMaxDays(e.target.value)}
                className="w-full p-4 border border-[#6A9C89] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6A9C89] text-white font-medium py-4 px-6 rounded-lg hover:bg-[#5a8e74] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ToolForm;
