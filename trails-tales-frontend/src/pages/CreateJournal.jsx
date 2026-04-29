import { useState } from "react";
import api from "../api/axios";

export default function CreateJournal() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/journals", {
      ...form,
      location: {
        name: form.location,
        coordinates: [77.1, 28.6], // temp coords
      },
    });

    alert("Journal created");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Location"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <button>Create</button>
    </form>
  );
}
