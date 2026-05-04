import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Bookmark, Calendar, Heart, MapPin, MessageCircle, Share2, ArrowLeft, Plus } from "lucide-react"; // Added ArrowLeft
import Footer from "../components/Footer";
import AddToTripModal from "../components/AddToTripModal";

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [journal, setJournal] = useState(null);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchJournal();
  }, [id]);

  const fetchJournal = async () => {
    const res = await api.get(`/journals/${id}`);
    setJournal(res.data);
  };

  const handleLike = async () => {
    const res = await api.post(`/journals/${id}/like`);
    setJournal(res.data);
  };

  const handleComment = async () => {
    if (!comment) return;
    const res = await api.post(`/journals/${id}/comment`, { text: comment });
    setJournal(res.data);
    setComment("");
  };

  if (!journal) return <div className="h-screen flex items-center justify-center italic text-muted">Loading your story...</div>;

  return (
    <div className="bg-bg min-h-screen font-sans text-text selection:bg-primary/20">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        
        {/* PHYSICAL BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/40 backdrop-blur-md border border-white/30 text-text rounded-full transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <img
          src={journal.images?.[0]}
          alt={journal.title}
          className="w-full h-full object-cover"
        />
        
        {/* The "Vignette" Fade into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-bg" />
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-4">
           <div className="flex gap-2 mb-4">
            {journal.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] uppercase text-text font-medium tracking-widest bg-white border border-text/20 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-lora text-center max-w-4xl leading-tight">
            {journal.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-text">
             <span className="flex items-center gap-1"><MapPin size={15} /> {journal.location?.name}</span>
             <span className="flex items-center gap-1"> <Calendar size={15} />{new Date(journal.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <article className="max-w-2xl mx-auto px-6 py-12">
        
        {/* AUTHOR BAR */}
        <div className="flex items-center justify-between border-y border-black/5 py-6 mb-10">
          <div className="flex items-center gap-3">
            <img src={journal.user?.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="" />
            <div>
              <p className="font-bold text-sm tracking-tight">{journal.user?.name}</p>
              <p className="text-xs text-muted">Explorer • 1.2k followers</p>
            </div>
          </div>
          <button className="bg-primary text-white text-xs px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
            Follow
          </button>
        </div>

        {/* STORY CONTENT */}
        <div className="prose prose-stone lg:prose-xl italic-first-line">
          <p className="text-xl leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-primary">
            {journal.story}
          </p>
        </div>
        {journal.images?.length > 1 && (
          <div className="mt-12">
            <h3 className="text-lg font-serif mb-4">Moments captured</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {journal.images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-60 object-cover rounded-xl hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        )}


        {/* INTERACTION BAR */}
        <div className="flex items-center bg-white rounded-full px-2 py-2 w-fit mx-auto gap-6 shadow-sm border border-black/5 my-16">
            <button 
                onClick={handleLike}
                className="flex items-center gap-2 px-5 py-2 rounded-full hover:opacity-80 transition-all"
            >
                <Heart size={18} className="text-primary" />
                <span className="font-bold text-primary text-sm">
                {journal.likes.length.toLocaleString()}
                </span>
            </button>

            <div className="flex items-center gap-2 text-primary pr-2">
                <MessageCircle size={18} />
                <span className="font-bold text-sm">
                {journal.comments.length}
                </span>
            </div>

            <button className="text-primary hover:opacity-60 transition-opacity">
                <Bookmark size={18} />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-primary hover:opacity-60 transition-opacity"
            >
              <Plus size={18}/>
            </button>


            <button className="text-primary hover:opacity-60 transition-opacity pr-4">
                <Share2 size={18} />
            </button>
        </div>

        {/* COMMENTS SECTION */}
        <section className="mt-16">
          <h3 className="text-lg font-serif mb-8 italic">Comments ({journal.comments.length})</h3>
          
          <div className="space-y-4">
            {journal.comments.map((c, i) => (
              <div key={i} className="bg-black/5 p-4 rounded-2xl flex gap-4">
                <img src={c.user?.avatar} className="w-8 h-8 rounded-full" alt="" />
                <div>
                  <p className="text-xs font-bold mb-1">{c.user?.name}</p>
                  <p className="text-sm text-text/80">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-3 items-center bg-white border border-black/5 p-2 rounded-full shadow-sm focus-within:ring-1 ring-primary/20 transition-all">
             <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-transparent outline-none px-4 text-sm"
                placeholder="Add to the conversation..."
              />
              <button
                onClick={handleComment}
                className="bg-primary text-white text-xs px-6 py-2 rounded-full font-medium"
              >
                Post
              </button>
          </div>
        </section>
      </article>
      
      <div className="h-24" />
      {showModal && (
        <AddToTripModal
          journalId={id}
          onClose={() => setShowModal(false)}
        />
      )}

      <Footer/>
    </div>
  );
};

export default JournalDetail;