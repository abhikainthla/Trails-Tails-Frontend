import { useEffect, useState } from "react";
import api from "../api/axios";
import { CiCalendar, CiGlobe, CiImageOn, CiLocationOn } from "react-icons/ci";
import { GoTag } from "react-icons/go";
import Navbar from "../components/Navbar";
import { createJournalService } from "../services/journal.service";
import { useLocation } from "react-router-dom";

export default function CreateJournal() {
  const locationHook = useLocation();
  const params = new URLSearchParams(locationHook.search);

  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    story: "",
    location: "",
    lat: "",
    lng: "",
    date: "",
    tags: "",
    visibility: "public"
  });

  const getCoordinates = async (place) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${place}&format=json`
  );
  const data = await res.json();

  if (data.length > 0) {
    return {
      lat: data[0].lat,
      lng: data[0].lon,
    };
  }
  return null;
};

useEffect(() => {
  const lat = params.get("lat");
  const lng = params.get("lng");
  const name = params.get("name");

  if (lat && lng) {
    setForm((prev) => ({
      ...prev,
      lat,
      lng,
      location: name || "",
    }));
  }
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("story", form.story);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("tags", form.tags);
    formData.append("visibility", form.visibility);

    images.forEach((img) => {
      formData.append("images", img);
    });
    const coords = await getCoordinates(form.location);

    if (coords) {
      formData.append("lat", coords.lat);
      formData.append("lng", coords.lng);
    }


    await createJournalService(formData);

    alert("Journal created!");
  } catch (err) {
    console.error(err);
  }
};



  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-8 bg-bg font-nunito">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm uppercase tracking-wider text-muted mb-2">New Field Entry</h2>
        <h1 className="text-4xl font-medium font-lora text-text mb-8">What did you find out there?</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="flex flex-col items-center border-2 border-dashed border-primary/20 rounded-xl p-12 text-center bg-white/50 hover:bg-white/50 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="fileUpload"
              onChange={(e) => setImages([...e.target.files])}

            />

            <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer">
              <div className="text-primary mb-2 text-2xl p-2 bg-blur rounded-full">
                <CiImageOn />
              </div>
              <p className="font-semibold">Click to upload photos</p>
              <p className="text-xs text-muted">
                JPG, PNG, or HEIC. Up to 20 per entry.
              </p>
            </label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          )}


          {/* Title */}
          <div className="bg-white/50 rounded-3xl py-8 px-6">

          <label className="text-primary text-sm font-medium">TITLE</label>
          <input
            className="w-full bg-transparent font-semibold  font-lora p-4 text-2xl placeholder:text-muted focus:outline-none"
            placeholder="A Morning Above Clouds..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          </div>
          {/* Story Area */}
          <div className="relative bg-white/50 rounded-3xl py-8 px-6">
            <label className="text-primary text-sm font-medium">THE STORY</label>
            <textarea
              className="w-full bg-transparent placeholder:text-muted rounded-lg p-4 h-40 focus:outline-none"
              placeholder="We left the rifugio at 4am, boots crunching frost..."
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
            />
            <button type="button" className="absolute top-2 right-2 text-xs bg-blur px-2 py-1 rounded-md">
              ✨ Polish with AI
            </button>
          </div>

          {/* Meta Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/50 rounded-3xl py-8 px-6">
              <label className="text-primary text-sm font-medium"
                >
                LOCATION</label>
              <div className="flex items-center">
              <CiLocationOn className="text-xl text-primary" />
              <input className="w-full bg-transparent font-semibold  p-4 text-xs placeholder:text-muted focus:outline-none " placeholder="Location"
              
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>
            <div className="flex flex-col bg-white/50 rounded-3xl py-8 px-6">
              <label className="text-primary text-sm font-medium">DATE</label>
              <div className="flex items-center">
              <CiCalendar className="text-xl text-primary"  />
              <input className="w-full bg-transparent font-semibold  p-4 text-xs placeholder:text-muted focus:outline-none "
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
              </div>
            </div>
            <div className="bg-white/50 rounded-3xl py-8 px-6">
              <label className="text-primary text-sm font-medium">ADD TAGS</label>
              <div className="flex items-center">
              <GoTag className="text-xl text-primary"  /><input className="w-full bg-transparent font-semibold  p-4 text-xs placeholder:text-muted focus:outline-none" placeholder="Add tags (comma separated)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}

              />
              </div>
            </div>
            
            
          </div>

          {/* Visibility Selector */}
          <div className="bg-white/50 rounded-3xl py-8 px-6">
            <h1 className="text-primary text-sm font-medium mb-2">WHO CAN SEE THIS?</h1>
          <div className="grid grid-cols-3 gap-4">
            {["Public", "Followers", "Private"].map((option) => (
              <div 
                key={option}
                onClick={() => setForm({...form, visibility: option.toLowerCase()})}
                className={`cursor-pointer border p-4 rounded-2xl transition-all ${form.visibility === option.toLowerCase() ? 'bg-blur border-primary' : 'bg-white border-primary/10'}`}
              >
                <div className="font-bold text-sm mb-1">{option}</div>
                <div className="text-xs text-muted">Description for {option}</div>
              </div>
            ))}
          </div>
          </div>
          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" className="px-6 py-2 font-semibold text-text rounded-full bg-white/50">Save draft</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-full font-semibold">Publish entry</button>
          </div>
        </form>
      </div>
    </div>
    </>

  );
}