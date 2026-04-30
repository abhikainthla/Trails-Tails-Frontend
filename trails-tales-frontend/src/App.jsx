import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateJournal from "./pages/CreateJournal";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Feed from "./pages/Feed";
import JournalDetail from "./pages/JournalDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/journal/:id" element={<JournalDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateJournal />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
