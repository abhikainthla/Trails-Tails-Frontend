import { useEffect, useState } from "react";
import { getJournalsService } from "../services/journal.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJournalsService();
      setJournals(res.data.slice(0, 3)); // only top 3 like UI
    };
    fetchData();
  }, []);

  return (
    <div className="bg-grain min-h-screen font-sans selection:bg-primary selection:text-white">
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
              <button className="bg-primary hover:bg-primary/90 transition-all px-8 py-3.5 rounded-full text-white font-medium flex items-center gap-2 shadow-lg shadow-primary/20">
                Wander the feed <span className="text-lg">→</span>
              </button>
              <button className="bg-white/80 hover:bg-white transition-all backdrop-blur-md border border-white/50 px-8 py-3.5 rounded-full text-primary font-medium shadow-sm">
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
        <h2 className="text-xl font-semibold mb-6">
          This week’s tales
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {journals.map((j) => (
            <div
              key={j._id}
              className="rounded-xl overflow-hidden shadow bg-white group"
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
      <section className="max-w-5xl mx-auto mt-20 px-6 text-center">
        <h2 className="text-lg font-semibold mb-8">
          A journal that knows where it’s been.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Feature
            title="Write the story"
            desc="Capture your travel moments beautifully."
          />
          <Feature
            title="Pin it to the world"
            desc="Attach your story to real locations."
          />
          <Feature
            title="Let it live"
            desc="Share your journeys with others."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-4xl mx-auto mt-20 px-6">
        <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-10 rounded-2xl text-center mb-20">
          <h2 className="text-4xl text-justify w-[450px] font-lora font-semibold mb-2">
            Your next trip deserves a better notebook.
          </h2>
          <p className="text-justify">Start writing in 30 seconds. Free, forever, for the kind of stories worth keeping.</p>

          <button className="mt-6 bg-white text-black px-6 py-2 rounded-full text-sm ">
            Start writing
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
