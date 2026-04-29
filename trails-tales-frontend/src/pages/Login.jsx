import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginService } from "../services/auth.service";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginService(form);

      localStorage.setItem("token", res.data.token);
      setAuth({
        user: res.data.user,
        token: res.data.token,
      });

      toast.success("Welcome back ✨");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT IMAGE SECTION */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <p className="text-2xl font-lora font-semibold leading-relaxed">
            “Not all those who wander are lost — but the ones who write it down remember the way home.”
          </p>
          <p className="mt-3 text-md opacity-80">
            — FIELD NOTES, VOL. 04
          </p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-6 py-16 sm:px-12 bg-grain">
        <div className="w-full max-w-md">

          <p className="text-xs text-muted font-nunito mb-2 tracking-widest">
            WELCOME BACK
          </p>

          <h1 className="text-4xl font-lora font-[400] mb-3">
            Pick up where the trail left off.
          </h1>

          <p className="text-muted font-nunito mb-6">
            Sign in to revisit your journals and follow fellow travelers.
          </p>

          {/* SOCIAL BUTTONS */}
          <div className="flex justify-evenly gap-4 mb-6">
            <button className="flex items-center border bg-white rounded-full py-3 px-16 gap-1 text-sm">
              <FaGoogle /> Google
            </button>
            <button className="flex items-center border bg-white rounded-full py-3 px-16 gap-1 text-sm">
              <FaApple /> Apple
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6 text-muted text-sm">
            <div className="flex-1 h-px bg-gray-300"></div>
            OR WITH EMAIL
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="you@somewhere.earth"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex justify-between text-sm text-muted">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full font-medium hover:opacity-90 cursor-pointer"
            >
              {loading ? "Signing in..." : "Continue the journey →"}
            </button>
          </form>

          <p className="text-sm text-muted mt-6">
            New here?{" "}
            <Link to="/register" className="text-primary font-medium">
              Start your journal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
