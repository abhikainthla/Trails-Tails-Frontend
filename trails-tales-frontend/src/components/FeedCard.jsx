import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, MessageCircle } from 'lucide-react';


const FeedCard = ({ journal }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/journal/${journal._id}`)}
      className="cursor-pointer rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white"
    >
      {/* IMAGE */}
      <div className="relative h-[420px]">

        <img
          src={
            journal.images?.[0] ||
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          }
          className="w-full h-full object-cover"
        />

        {/* TOP LOCATION BADGE */}
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <MapPin size={15} /> {journal.location?.name || "Unknown"}
        </div>

        {/* BOTTOM OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
          
          {/* TAGS */}
          <div className="flex gap-2 mb-2">
            {journal.tags?.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* TITLE */}
          <h2 className="text-white text-xl font-semibold leading-tight">
            {journal.title}
          </h2>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between p-4">
        
        {/* USER */}
        <div className="flex items-center gap-2">
          <img
            src={journal.user?.avatar || "https://i.pravatar.cc/40"}
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{journal.user?.name}</p>
            <p className="text-xs text-muted">
              {new Date(journal.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="flex gap-4 text-sm text-muted">
          <span className="flex items-center gap-1"><Heart size={15} /> {journal.likes?.length || 0}</span>
          <span className="flex items-center gap-1"><MessageCircle size={15} /> {journal.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
