import { Link } from "react-router-dom";
import { IoIosCompass } from "react-icons/io";
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" border-t border-black/10 bg-bg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-text">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <IoIosCompass className="text-white text-lg" />
            </div>
            <span className="font-lora tracking-wide">Trail&Tales</span>
          </Link>
          <p className="mt-4 text-sm text-text/70 leading-relaxed">
            Capture your journeys, relive your adventures, and explore the world
            through stories shared by travelers like you.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="font-semibold text-text mb-2">Explore</h3>
          <Link to="/feed" className="text-text/70 hover:text-primary transition">
            Feed
          </Link>
          <Link to="/map" className="text-text/70 hover:text-primary transition">
            Map
          </Link>
          <Link to="/trips" className="text-text/70 hover:text-primary transition">
            Trips
          </Link>
          <Link to="/travelers" className="text-text/70 hover:text-primary transition">
            Travelers
          </Link>
        </div>

        {/* Social + CTA */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-text">Connect</h3>

          <div className="flex gap-4 text-lg text-text/70">
            <a href="#" className="hover:text-primary transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaGithub />
            </a>
          </div>

          <Link
            to="/create"
            className="mt-2 inline-block bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition w-fit"
          >
            Share your story
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 text-center py-4 text-sm text-text/60">
        © {new Date().getFullYear()} Trail&Tales. All rights reserved.
      </div>
    </footer>
  );
}
