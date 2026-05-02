import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await api.get("/trips");
    setTrips(res.data);
  };

  return (
    <>
    <Navbar/>
    <div className="px-10 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase">
            Collections
          </p>
          <h1 className="text-4xl font-lora mt-2">
            Trips, told in chapters.
          </h1>
          <p className="text-gray-500 mt-2">
            Group your journals into meaningful journeys.
          </p>
        </div>

        <Link
          to="/create-trip"
          className="bg-primary text-white px-5 py-2 rounded-full"
        >
          + New Trip
        </Link>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <Link
            key={trip._id}
            to={`/trips/${trip._id}`}
            className="rounded-2xl overflow-hidden shadow hover:scale-[1.02] transition"
          >
            {/* Image */}
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${trip.coverImage || "/fallback.jpg"})`,
              }}
            />

            {/* Content */}
            <div className="p-4 bg-white">
              <h2 className="font-semibold text-lg">{trip.title}</h2>

              <p className="text-sm text-gray-500 mt-2">
                {trip.journals.length} stories
              </p>

              <div className="mt-3 space-y-2">
                {trip.journals.slice(0, 2).map((j) => (
                  <div key={j._id} className="flex gap-2 items-center">
                    <img
                      src={j.images?.[0]}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <p className="text-xs">{j.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {/* Empty Card */}
        <Link
          to="/create-trip"
          className="border-2 border-dashed rounded-2xl flex items-center justify-center h-64 text-gray-400 hover:bg-gray-50"
        >
          + Start a new trip
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}
