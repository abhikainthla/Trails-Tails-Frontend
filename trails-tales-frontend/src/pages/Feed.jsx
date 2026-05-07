import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import FeedCard from "../components/FeedCard";
import Footer from "../components/Footer";

const Feed = () => {
  const [journals, setJournals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const fetchJournals = async () => {
    try {
      let url = "/journals";

      if (search) url = `/journals/search?q=${search}`;
      if (selectedTag !== "All") url = `/journals?tag=${selectedTag}`;

      const res = await api.get(url);
      setJournals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [search, selectedTag]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg px-8 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">
                Global Feed
              </p>
              <h1 className="text-4xl font-lora text-text mt-2">
                Stories on the move.
              </h1>
            </div>

            {/*  Search */}
            <input
              placeholder="Search places, stories..."
              className="px-4 py-2 rounded-full bg-white border text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/*  Tags */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["All", "Mountains", "Beach", "Forest", "City"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1 rounded-full text-xs transition ${
                  selectedTag === tag
                    ? "bg-primary text-white"
                    : "bg-blur text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-3 gap-6 space-y-6">
            {journals.map((journal) => (
              <div key={journal._id} className="break-inside-avoid">
                <FeedCard journal={journal} />
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Feed;
