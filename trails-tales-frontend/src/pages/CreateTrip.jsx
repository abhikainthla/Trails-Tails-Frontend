import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreateTrip() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      alert("Trip title is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (file) formData.append("cover", file);

      await api.post("/trips", formData);

      alert("Trip created ✨");
      navigate("/trips");
    } catch (err) {
      console.error(err);
      alert("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted">
            New Collection
          </p>

          <h1 className="text-4xl font-lora mt-2 mb-10">
            Start a new trip
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Cover Upload */}
            <div className="border-2 border-dashed border-primary/20 rounded-2xl p-10 text-center bg-white/50">
              <input
                type="file"
                hidden
                id="coverUpload"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label htmlFor="coverUpload" className="cursor-pointer">
                <p className="font-semibold">Upload cover image</p>
                <p className="text-xs text-muted">
                  This will represent your journey
                </p>
              </label>

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  className="mt-4 h-40 w-full object-cover rounded-xl"
                />
              )}
            </div>

            {/* Title */}
            <div className="bg-white/50 rounded-3xl p-6">
              <label className="text-primary text-sm">TITLE</label>
              <input
                className="w-full bg-transparent text-2xl font-lora p-2 outline-none"
                placeholder="Italian Slow Days..."
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="bg-white/50 rounded-3xl p-6">
              <label className="text-primary text-sm">DESCRIPTION</label>
              <textarea
                className="w-full bg-transparent p-2 outline-none"
                placeholder="Describe your journey..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-2 rounded-full disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Trip"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
