import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import bgimage from "../assets/bgimage.png";
//import "tailwind-scrollbar-hide"; // Make sure you installed this plugin

const Userhome = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [trendingBooks, setTrendingBooks] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch 12 trending books
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=trending&limit=12"
        );
        const data = await res.json();
        setTrendingBooks(data.docs.slice(0, 12));
      } catch (err) {
        console.error("Error fetching trending books:", err);
      }
    };
    fetchTrending();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      const sortedBooks = data.docs.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setBooks(sortedBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHomeClick = () => {
    setQuery("");
    setBooks([]);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black text-white py-3 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">📚 Book Finder</h1>
        <div className="flex items-center gap-6">
          <button onClick={handleHomeClick} className="hover:underline">
            Home
          </button>
          <button
            onClick={scrollToSearch}
            className="text-white hover:text-yellow-400 transition text-2xl"
          >
            <FaSearch />
          </button>
        </div>
      </header>

      {/* Banner */}
      <section className="flex flex-col items-center justify-center text-center py-32 bg-black/60 mt-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
          Discover Your Next Favorite Book
        </h2>
        <p className="text-lg max-w-2xl mb-6">
          Explore millions of books, from timeless classics to trending reads.
        </p>
        <button
          onClick={scrollToSearch}
          className="bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-700 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:via-yellow-500 hover:to-yellow-600 transition shadow-lg"
        >
          Start Searching
        </button>
      </section>

      {/* Trending Carousel */}
      <section className="py-8 sm:py-12 bg-black/70">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          🔥 Books on Trending
        </h3>
        <div className="relative overflow-x-auto hide-scrollbar  w-full px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 animate-carousel">
            {trendingBooks.map((book, index) => (
              <Link
                to={`/singlebook/${book.key.replace("/works/", "")}`}
                key={index}
                className="flex-shrink-0 w-32 sm:w-36 md:w-40 h-48 sm:h-56 md:h-60 bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden"
              >
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : "https://via.placeholder.com/150"
                  }
                  alt={book.title}
                  className="max-h-full max-w-full object-contain transition hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section ref={searchRef} className="py-16 bg-black/70 px-6">
        <h3 className="text-3xl font-bold text-center mb-8">
          🔎 Search for Books
        </h3>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center mb-6 gap-3">
          <input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-6 py-4 w-full sm:w-[500px] rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-300 text-xl bg-black bg-opacity-60"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-700 text-black px-6 py-4 rounded-lg hover:from-yellow-300 hover:via-yellow-500 hover:to-yellow-600 transition text-xl font-semibold shadow-lg"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {books.length === 0 ? (
          <p className="text-center text-lg text-gray-300">
            No books found. Try searching.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <Link
                to={`/singlebook/${book.key.replace("/works/", "")}`}
                key={index}
                className="block"
              >
                <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition text-black h-[380px] flex flex-col">
                  <div className="flex justify-center items-center h-[240px] mb-3">
                    <img
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                          : "https://via.placeholder.com/150"
                      }
                      alt={book.title}
                      className="max-h-full max-w-full object-contain rounded-md"
                    />
                  </div>
                  <h2 className="text-lg font-semibold truncate">{book.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {book.author_name?.[0] || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {book.first_publish_year || "N/A"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Userhome;
