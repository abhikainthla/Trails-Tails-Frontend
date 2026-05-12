import { useEffect, useState } from "react";
import { getJournalsService } from "../services/journal.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Astroid, BookOpen, MapPin, MoveRight, Users  } from "lucide-react";
import { getTravelersService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [journals, setJournals] = useState([]);
  const [travelers, setTravelers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJournalsService();
      setJournals(res.data.slice(0, 3));

      const travelersRes = await getTravelersService();
      setTravelers(travelersRes.data.slice(0, 4));
    };

    fetchData();
  }, []);

  return (
    <div className="bg-grain min-h-screen selection:bg-primary selection:text-white">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with soft fade */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            className="w-full h-full object-cover object-center"
            alt="Nature Background"
          />
          {/* Subtle gradient overlay to make text readable on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1e8]/80 via-[#f5f1e8]/40 to-transparent" />
          {/* Bottom fade into the stats section */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#f5f1e8] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div className="max-w-xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-8">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
                 Field Journal • Est. 2026
               </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-serif text-primary leading-[1.1] mb-6">
              Every trail is <br /> 
              worth <span className="italic font-normal text-[#326234]">a tale.</span>
            </h1>

            <p className="text-lg text-gray-700/80 leading-relaxed mb-10 max-w-md">
              Trail&Tales is where travelers keep their stories — pinned to maps, illustrated with photographs, and shared with people walking parallel paths.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("/feed")} className="bg-primary hover:bg-primary/90 transition-all px-8 py-3.5 rounded-full text-white font-medium flex items-center gap-2 shadow-lg shadow-primary/20">
                Wander the feed <span className="text-lg">→</span>
              </button>
              <button onClick={() => navigate("/map")} className="bg-white/80 hover:bg-white transition-all backdrop-blur-md border border-white/50 px-8 py-3.5 rounded-full text-primary font-medium shadow-sm">
                Open the map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-black/5 border border-white p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat label="Travelers" value="12.4k" />
          <Stat label="Journal Entries" value="48k" />
          <Stat label="Countries Pinned" value="192" />
          <Stat label="Trail Miles Logged" value="1.2M" />
        </div>
      </section>

      {/* ================= WEEKLY TALES ================= */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <div className="flex justify-between items-start">
          <div>

        <p className="text-xs uppercase text-gray-500 tracking-widest">
              Field notes
            </p>
            <h1 className="text-5xl font-lora text-text mb-4">
              This week's tales
            </h1>
          </div>
          <button
            onClick={() => navigate("/feed")}
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Browse all →
          </button>
          </div>

        <div className="grid md:grid-cols-3 gap-6">
          {journals.map((j) => (
            <div
              key={j._id}
              className="rounded-xl overflow-hidden shadow bg-white group"
              onClick={() => navigate(`/journal/${j._id}`)}
            >
              <img
                src={j.images?.[0]}
                className="h-60 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="p-4">
                <p className="font-semibold">{j.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {j.user?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <p className="text-xs uppercase text-gray-500 tracking-widest">
              How it works
            </p>
            <h1 className="text-5xl font-lora text-text mb-4">
              A journal that knows where it's been.
            </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col bg-white/90 backdrop-blur-xl rounded-xl gap-2 p-6">
            <div className="flex items-center gap-2">
            <p className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm"><BookOpen size={18} className="text-white text-lg" /></p> 
            <span className="text-muted">01</span>
            </div>

            <h2 className="text-2xl font-lora">Write the entry</h2>
            <p className="xs">Markdown, photos, and the date. Tag it, set who can see it. That's it.</p>
          </div>
          <div className="flex flex-col bg-white/90 backdrop-blur-xl rounded-xl gap-2 p-6">
            <div className="flex items-center gap-2">
            <p className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm"><MapPin size={18} className="text-white text-lg" /></p> 
            <span className="text-muted">02</span>
            </div>

            <h2 className="text-2xl font-lora">Pin it to the world</h2>
            <p className="xs">Every entry drops a pin. Watch your atlas grow trip by trip.</p>
          </div>
          <div className="flex flex-col bg-white/90 backdrop-blur-xl rounded-xl gap-2 p-6">
            <div className="flex items-center gap-2">
            <p className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm"><Astroid size={18} className="text-white text-lg" /></p> 
            <span className="text-muted">03</span>
            </div>

            <h2 className="text-2xl font-lora">Let AI help</h2>
            <p className="xs">Caption photos, polish prose, get recs for what's nearby — without losing your voice.</p>
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY ================= */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs uppercase text-gray-500 tracking-[0.25em] flex items-center gap-2">
              <Users size={14} />
              The community
            </p>

            <h1 className="text-5xl font-lora text-text mb-4">
              Follow people who go places.
            </h1>
          </div>

          <button
            onClick={() => navigate("/travelers")}
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            See all →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {travelers.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/profile/${user._id}`)}
              className="bg-white/90 backdrop-blur-xl border border-[#ece7dd] rounded-[2rem] p-7 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* AVATAR */}
              <img
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                }
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />

              {/* NAME */}
              <div className="mt-6">
                <h2 className="text-xl font-lora text-[#102414] leading-none">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  @{user.username}
                </p>
              </div>

              {/* BIO */}
              <p className="text-[14px] leading-7 text-[#374151] mt-6 min-h-[90px]">
                {user.bio || "Traveler collecting stories around the world."}
              </p>

              {/* STATS */}
              <div className="flex items-center justify-between mt-8">
                <div>
                  <span className="font-bold text-[#102414]">
                    {user.totalPosts || 0}
                  </span>

                  <span className="text-gray-500 text-sm ml-1">
                    places
                  </span>
                </div>

                <div>
                  <span className="font-bold text-[#102414]">
                    {user.followersCount || 0}
                  </span>

                  <span className="text-gray-500 text-sm ml-1">
                    followers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => navigate("/travelers")}
          className="md:hidden mt-8 flex items-center gap-2 text-primary font-medium"
        >
          See all →
        </button>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-16 rounded-2xl text-center mb-20">
          <h2 className="text-4xl text-justify w-[450px] font-lora font-semibold mb-2">
            Your next trip deserves a better notebook.
          </h2>
          <p className="text-justify">Start writing in 30 seconds. Free, forever, for the kind of stories worth keeping.</p>

          <button onClick={() => navigate("/create")} className=" flex items-center gap-2 mt-6 bg-white text-black px-6 py-2 rounded-full text-sm ">
            Start writing <MoveRight size={16} />
          </button>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Stat = ({ label, value }) => (
  <div>
    <p className="font-bold text-lg">{value}</p>
    <p className="text-gray-400 text-xs">{label}</p>
  </div>
);

const Feature = ({ title, desc }) => (
  <div className="bg-white p-5 rounded-xl shadow text-left">
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{desc}</p>
  </div>
);
