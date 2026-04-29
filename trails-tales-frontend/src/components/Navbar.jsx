import { Link } from "react-router-dom";
import { IoIosCompass } from "react-icons/io";

export default function Navbar() {
  return (
    <nav className="flex justify-between border border-b-blur items-center py-6 px-8 bg-bg">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-xl font-medium text-text">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-lg"><IoIosCompass /></span>
        </div>
        <span className="font-lora">Trail&Tales</span>
      </Link>

      {/* Navigation Links (Pill Container) */}
      <div className="flex items-center p-1 gap-1">
        {["Feed", "Map", "Trips", "Travelers"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="px-5 py-1.5 rounded-full text-sm font-bold text-primary hover:bg-blur transition-all"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/create"
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          New entry
        </Link>
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-black/10 object-cover"
        />
      </div>
    </nav>
  );
}