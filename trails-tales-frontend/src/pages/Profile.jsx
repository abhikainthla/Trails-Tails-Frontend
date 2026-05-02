import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [tab, setTab] = useState("journals");

  if (!id) return null; 



 useEffect(() => {
    if (!id) return;

    fetchProfile();
  }, [id]);



  const fetchProfile = async () => {
    const res = await api.get(`/users/${id}`);
    setData(res.data);
  };

  const handleFollow = async () => {
    await api.post(`/users/${id}/follow`);
    fetchProfile();
  };

  if (!data) return <div>Loading...</div>;

  const { user, journals, trips, stats, isFollowing } = data;

  return (
    <>
      <Navbar />

      <div className="bg-bg min-h-screen">
        
        {/* COVER */}
        <div className="h-48 bg-gradient-to-r from-green-700 to-green-900" />

        <div className="max-w-5xl mx-auto px-6">
          
          {/* HEADER */}
          <div className="flex items-end gap-6 -mt-16">
            <img
              src={user.avatar}
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
            />

            <div className="flex-1">
              <h1 className="text-4xl font-lora">{user.name}</h1>
              <p className="text-sm text-gray-500">@{user.name}</p>
              <p className="text-sm mt-2">{user.bio}</p>
            </div>

            <button
              onClick={handleFollow}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 bg-white mt-6 p-6 rounded-2xl shadow">
            <Stat label="Trips" value={stats.trips} />
            <Stat label="Places" value={stats.places} />
            <Stat label="Followers" value={stats.followers} />
            <Stat label="Following" value={stats.following} />
          </div>

          {/* TABS */}
          <div className="flex gap-6 mt-10 border-b">
            {["journals", "trips"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2 ${
                  tab === t
                    ? "border-b-2 border-primary"
                    : "text-gray-400"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="mt-6">
            {tab === "journals" && (
              <div className="columns-3 gap-6 space-y-6">
                {journals.map((j) => (
                  <div key={j._id} className="break-inside-avoid">
                    <img
                      src={j.images?.[0]}
                      className="rounded-xl"
                    />
                    <p className="mt-2 text-sm font-medium">
                      {j.title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === "trips" && (
              <div className="grid grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <div
                    key={trip._id}
                    className="rounded-2xl overflow-hidden shadow"
                  >
                    <img
                      src={trip.coverImage}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="font-semibold">{trip.title}</p>
                      <p className="text-xs text-gray-500">
                        {trip.journals.length} stories
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const Stat = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);
