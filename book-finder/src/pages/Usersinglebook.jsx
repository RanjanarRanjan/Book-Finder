import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import bgimage from "../assets/bgimage.png";

const Usersinglebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book details:", err));
  }, [id]);

  if (!book) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-gray-200 text-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        Loading book details...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* Header */}
      <header className="bg-black bg-opacity-80 text-white py-4 px-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <h1 className="text-xl font-bold">📖 Book Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-700 text-black px-4 py-2 rounded-lg font-semibold hover:from-yellow-300 hover:via-yellow-500 hover:to-yellow-600 transition shadow-md"
        >
          <FaArrowLeft /> Back
        </button>
      </header>

      {/* Book Content */}
      <div className="container mx-auto p-4 md:p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-yellow-400 mb-8 md:mb-12 px-2">
          {book.title}
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 bg-black/70 p-4 md:p-6 rounded-xl shadow-lg">
          {/* Cover */}
          <img
            src={
              book.covers
                ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                : "https://via.placeholder.com/250"
            }
            alt={book.title}
            className="w-48 md:w-80 lg:w-96 object-cover rounded-lg shadow-xl flex-shrink-0"
          />

          {/* Details */}
          <div className="text-sm md:text-base space-y-4 md:space-y-6 text-white max-w-full md:max-w-2xl">
            <p>
              <strong className="text-yellow-400">📖 Description:</strong>{" "}
              {typeof book.description === "string"
                ? book.description
                : book.description?.value || "No description available."}
            </p>

            <p>
              <strong className="text-yellow-400">📅 First Published:</strong>{" "}
              {book.first_publish_date || "N/A"}
            </p>

            <p>
              <strong className="text-yellow-400">🏷️ Subjects:</strong>{" "}
              {book.subjects ? book.subjects.slice(0, 8).join(", ") : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usersinglebook;
