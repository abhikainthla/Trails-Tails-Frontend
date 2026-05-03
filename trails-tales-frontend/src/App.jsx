import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateJournal from "./pages/CreateJournal";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Feed from "./pages/Feed";
import JournalDetail from "./pages/JournalDetail";
import Trips from "./pages/Trips";
import CreateTrip from "./pages/CreateTrip";
import CompleteProfile from "./pages/CompleteProfile";
import Travelers from "./pages/Travelers";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((s) => s.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (user && !user.isProfileComplete) {
      navigate("/complete-profile");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/journal/:id" element={<JournalDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateJournal />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/travelers" element={<Travelers />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/edit-profile" element={<ProfileEdit />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
    </Routes>
  );
}

export default App; 
