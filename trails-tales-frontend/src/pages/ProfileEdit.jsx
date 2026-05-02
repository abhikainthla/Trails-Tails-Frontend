import { useState } from "react";
import useAuthStore from "../store/authStore";
import api from "../api/axios";

export default function ProfileEdit() {
  const user = useAuthStore((s) => s.user);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("bio", form.bio);
    fd.append("location", form.location);

    if (avatar) fd.append("avatar", avatar);

    await api.put("/users/me", fd);

    await fetchUser(); // refresh global state
    alert("Profile updated!");
  };

  return (
    <div className="max-w-xl mx-auto py-20">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <button className="bg-primary text-white px-6 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
