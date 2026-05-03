import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("journals");
  const [interests, setInterests] = useState([]);
  const currentUser = useAuthStore((s) => s.user);
  const navigate = useNavigate();



  const ALL_INTERESTS = ["mountains", "beaches", "city", "food", "adventure", "luxury", "budget", "culture"];

  useEffect(() => {
    if (data?.user?.interests) {
      setInterests(data.user.interests);
    }
  }, [data]);

  useEffect(() => {
    if (id) fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  };

  const handleFollow = async () => {
    await api.post(`/users/${id}/follow`);
    fetchProfile();
  };

if (!data) {
  return (
    <div className="flex h-screen items-center justify-center text-gray-500 italic">
      Loading Profile...
    </div>
  );
}

const { user, journals, trips, stats, isFollowing } = data;

//  compute AFTER data exists
const isOwnProfile = currentUser?._id === user?._id;


  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* COVER SECTION */}
      <div className="h-60 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 relative" />

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* PROFILE HEADER CARD */}
        <div className="relative -mt-20 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-lg bg-white"
            />

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <span className="text-sm text-gray-400 font-mono">@{user.username}</span>
              </div>
              <p className="text-gray-600 mt-2 max-w-xl leading-relaxed">{user.bio || "No bio yet."}</p>
              
              {/* INTEREST TAGS - Grouped with bio */}
              <div className="flex flex-wrap gap-2 mt-4">
                {ALL_INTERESTS.map((tag) => {
                  const isActive = interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => setInterests(prev => 
                        prev.includes(tag) ? prev.filter(i => i !== tag) : [...prev, tag]
                      )}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                        isActive 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-sm" 
                        : "bg-white border-gray-200 text-gray-500 hover:border-emerald-300"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {isOwnProfile ? (
              <button
                onClick={() => navigate("/edit-profile")}
                className="px-8 py-2.5 rounded-xl font-semibold bg-black text-white hover:bg-gray-800 transition-all shadow-md"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className={`px-8 py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95 ${
                  isFollowing 
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}

          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 mt-8 pt-8">
            <Stat label="Trips" value={stats.trips} />
            <Stat label="Places" value={stats.places} />
            <Stat label="Followers" value={stats.followers} />
            <Stat label="Following" value={stats.following} />
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex gap-8 mt-12 border-b border-gray-200">
          {["journals", "trips"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all ${
                tab === t
                  ? "border-b-2 border-emerald-600 text-emerald-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CONTENT GRID */}
        <div className="mt-8">
          {tab === "journals" && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {journals.map((j) => (
                <div key={j._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow break-inside-avoid border border-gray-100">
                  <img src={j.images?.[0]} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" alt={j.title} />
                  <div className="p-4">
                    <p className="text-sm font-bold text-gray-800">{j.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "trips" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <div key={trip._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className="relative">
                    <img src={trip.coverImage} className="h-48 w-full object-cover" alt={trip.title} />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-emerald-800">
                      {trip.journals.length} Stories
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{trip.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div className="text-center md:text-left">
    <p className="text-2xl font-black text-gray-900">{value}</p>
    <p className="text-xs uppercase tracking-widest font-semibold text-gray-400">{label}</p>
  </div>
);