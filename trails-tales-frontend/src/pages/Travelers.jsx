import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useDebounce } from "../hooks/useDebounce";
import { followUserService } from "../services/user.service";

const Travelers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search, 500);

  // 🔥 FETCH USERS
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch]);

  const fetchUsers = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const res = await api.get(
        `/users?page=${page}&limit=6&search=${debouncedSearch}`
      );

      if (res.data.length === 0) {
        setHasMore(false);
      }

      setUsers((prev) =>
        page === 1 ? res.data : [...prev, ...res.data]
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 INFINITE SCROLL
  const loadMoreRef = useInfiniteScroll(() => {
    if (hasMore && !loading) {
      setPage((p) => p + 1);
    }
  });

  // 🔥 FOLLOW (OPTIMISTIC)
  const handleFollow = async (e, id) => {
    e.stopPropagation(); // prevent card click

    setUsers((prev) =>
      prev.map((u) =>
        u._id === id
          ? { ...u, isFollowing: !u.isFollowing }
          : u
      )
    );

    try {
      await followUserService(id);
    } catch {
      fetchUsers(); // rollback
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-10 py-12">

        {/* HEADER */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-gray-500 tracking-widest">
              Community
            </p>
            <h1 className="text-5xl font-lora text-[#1F4D3E] mb-4">
              Travelers worth following.
            </h1>
            <p className="text-md text-muted">A handful of writers, photographers, and slow walkers building atlases <br/> worth wandering.</p>
          </div>

          {/* SEARCH */}
          <input
            placeholder="Search travelers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full border bg-white"
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/profile/${user._id}`)}
              className="bg-white rounded-3xl border overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              {/* TOP */}
              <div className="flex justify-between p-6">
                <div className="flex gap-4">
                  <img
                    src={user.avatar}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      {user.name}

                      {/* VERIFIED */}
                      {user.isVerified && (
                        <span className="text-blue-500 text-xs">✔</span>
                      )}

                      {/* TIER */}
                      <span className="text-xs bg-gray-200 px-2 rounded">
                        {user.tier}
                      </span>
                    </h2>

                    <p className="text-sm text-gray-500">
                      {user.location || "Unknown"}
                    </p>

                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                      {user.bio || "Traveler exploring the world ✈️"}
                    </p>

                    <div className="flex gap-4 mt-2 text-sm">
                      <span>{user.totalPosts || 0} posts</span>
                      <span>{user.followersCount || 0} followers</span>
                    </div>
                  </div>
                </div>

                {/* FOLLOW BUTTON */}
                <button
                  onClick={(e) => handleFollow(e, user._id)}
                  className={`px-4 py-2 rounded-full h-10 text-sm ${
                    user.isFollowing
                      ? "bg-gray-200 text-black"
                      : "bg-primary text-white"
                  }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* IMAGES */}
              <div className="grid grid-cols-2 h-40">
                <img
                  src={
                    user.previewImages?.[0] ||
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                  }
                  className="w-full h-full object-cover"
                />
                <img
                  src={
                    user.previewImages?.[1] ||
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-6 text-gray-500">
            Loading travelers...
          </p>
        )}

        {/* EMPTY */}
        {!loading && users.length === 0 && (
          <p className="text-center mt-6 text-gray-400">
            No travelers found.
          </p>
        )}

        {/* INFINITE TRIGGER */}
        <div ref={loadMoreRef} className="h-10" />
      </div>

      <Footer />
    </>
  );
};

export default Travelers;
