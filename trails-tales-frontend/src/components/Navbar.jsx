import { NavLink, Link } from "react-router-dom";
import { IoIosCompass } from "react-icons/io";
import useAuthStore from "../store/authStore";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const navItems = ["Feed", "Map", "Trips", "Travelers"];
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);


useEffect(() => {
  api.get("/notifications").then(res => setNotifications(res.data));
}, []);

const unreadCount = notifications.filter(n => !n.isRead).length;

const markRead = async () => {
  await api.put("/notifications/read");
  setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
};

const formatMessage = (n) => {
  switch (n.type) {
    case "follow":
      return `👤 ${n.message}`;
    case "like":
      return `❤️ ${n.message}`;
    case "comment":
      return `💬 ${n.message}`;
    default:
      return n.message;
  }
};



  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-bg border-b border-black/10 backdrop-blur-md sticky top-0 z-50">
      
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold text-text"
      >
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm">
          <IoIosCompass className="text-white text-lg" />
        </div>
        <span className="font-lora tracking-wide">Trail&Tales</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center bg-blur p-1 rounded-full shadow-sm">
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-white shadow"
                  : "text-primary hover:bg-white/60"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/create"
          className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          New Entry
        </Link>

        {user?._id ? (
          <Link to={`/profile/${user._id}`}>
            <img
              src={user.avatar || "https://plus.unsplash.com/premium_vector-1768828064754-38298ea5fe0c?q=80&w=1098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-black/10 cursor-pointer hover:scale-105 transition"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-primary"
          >
            Sign in
          </Link>
        )}

        <div className="relative">
          <Bell
            className="cursor-pointer"
            onClick={() => {
              setOpen(!open);
              markRead();
            }}
          />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {unreadCount}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50 max-h-96 overflow-y-auto">
              
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500 text-sm">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`p-3 border-b text-sm ${
                      n.isRead ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {formatMessage(n)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>


      </div>
    </nav>
  );
}
