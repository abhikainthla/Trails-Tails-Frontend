import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginService } from "../services/auth.service";
import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.password) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const res = await loginService({
        email,
        password: form.password,
      });

      login(res.data, rememberMe);

      toast.success("Welcome back ✨");

      // App will automatically redirect incomplete
      // profiles to CompleteProfile.
      navigate("/");
    } catch (err) {
      console.error("LOGIN:", err);

      const message =
        err.response?.data?.message ||
        (!err.response
          ? "Unable to connect to the server"
          : "Login failed");

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SOCIAL
  // ==========================================

  const handleGoogleLogin = () => {
    toast("Google login will be connected to OAuth.");
  };

  const handleAppleLogin = () => {
    toast("Apple login will be connected to OAuth.");
  };

  // ==========================================
  // FORGOT PASSWORD
  // ==========================================

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex">

      {/* ======================================
          LEFT IMAGE
      ====================================== */}

      <div className="hidden lg:flex w-1/2 relative">

        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Mountain landscape"
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

      {/* ======================================
          RIGHT SIDE
      ====================================== */}

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

          {/* SOCIAL LOGIN */}

          <div className="grid grid-cols-2 gap-3 mb-6">

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center border bg-white rounded-full py-3 gap-2 text-sm hover:bg-gray-50 transition"
            >
              <FaGoogle />
              Google
            </button>

            <button
              type="button"
              onClick={handleAppleLogin}
              className="flex items-center justify-center border bg-white rounded-full py-3 gap-2 text-sm hover:bg-gray-50 transition"
            >
              <FaApple />
              Apple
            </button>

          </div>

          {/* DIVIDER */}

          <div className="flex items-center gap-3 mb-6 text-muted text-sm">

            <div className="flex-1 h-px bg-gray-300" />

            OR WITH EMAIL

            <div className="flex-1 h-px bg-gray-300" />

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* EMAIL */}

            <div>
              <label className="block text-sm mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@somewhere.earth"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-full border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
              />
            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-sm mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full rounded-full border border-gray-300 px-4 py-3 pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* OPTIONS */}

            <div className="flex justify-between items-center text-sm text-muted">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="accent-primary"
                />

                Remember me

              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="hover:underline"
              >
                Forgot password?
              </button>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                "Continue the journey →"
              )}

            </button>

          </form>

          <p className="text-sm text-muted mt-6">

            New here?{" "}

            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Start your journal
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}