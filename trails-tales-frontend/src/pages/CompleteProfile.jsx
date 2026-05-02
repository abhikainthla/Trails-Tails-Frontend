import ProfileEdit from "./ProfileEdit";
import Navbar from "../components/Navbar";

export default function CompleteProfile() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <ProfileEdit />
      </div>
    </>
  );
}
