import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { registerService } from "../services/auth.service";
import useAuthStore from "../store/authStore";

export default function Register() {
  const navigate = useNavigate();

  const register = useAuthStore(
    (state) => state.register
  );

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // PASSWORD STRENGTH
  // ==========================================

  const passwordRules = useMemo(() => {
    return {
      length: form.password.length >= 8,
      lowercase: /[a-z]/.test(form.password),
      uppercase: /[A-Z]/.test(form.password),
      number: /\d/.test(form.password),
    };
  }, [form.password]);

  const passwordStrong =
    passwordRules.length &&
    passwordRules.lowercase &&
    passwordRules.uppercase &&
    passwordRules.number;

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;

    if (name === "username") {
      nextValue = value
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const username = form.username.trim();
    const email = form.email.trim().toLowerCase();

    // -----------------------------
    // Name
    // -----------------------------

    if (name.length < 2) {
      toast.error("Please enter your full name");
      return;
    }

    // -----------------------------
    // Username
    // -----------------------------

    if (username && username.length < 3) {
      toast.error(
        "Username must be at least 3 characters"
      );
      return;
    }

    if (username.length > 20) {
      toast.error(
        "Username cannot exceed 20 characters"
      );
      return;
    }

    // -----------------------------
    // Email
    // -----------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // -----------------------------
    // Password
    // -----------------------------

    if (!passwordStrong) {
      toast.error(
        "Password must contain 8+ characters, uppercase, lowercase and a number"
      );
      return;
    }

    // -----------------------------
    // Confirm password
    // -----------------------------

    if (
      form.password !== form.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await registerService({
        name,
        username: username || undefined,
        email,
        password: form.password,
      });

      // Backend now returns token + user
      register(res.data);

      toast.success(
        "Account created successfully 🎉"
      );

      // App will redirect incomplete profile
      // to /complete-profile.
      navigate("/");
    } catch (err) {
      console.error("REGISTER:", err);

      const message =
        err.response?.data?.message ||
        (!err.response
          ? "Unable to connect to the server"
          : "Registration failed");

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ======================================
          LEFT IMAGE
      ====================================== */}

      <div className="hidden lg:flex w-1/2 relative">

        <img
          src="https://images.unsplash.com/photo-1554357475-accb8a88a330?q=80&w=764&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Travel landscape"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-12 left-12 text-white max-w-md">

          <p className="text-2xl font-lora font-semibold leading-relaxed">
            “The world is a book and those who do not travel read only one page.”
          </p>

          <p className="mt-3 text-md opacity-80">
            — AUGUSTINE OF HIPPO
          </p>

        </div>
      </div>

      {/* ======================================
          FORM
      ====================================== */}

      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-6 py-12 sm:px-12 bg-grain overflow-y-auto">

        <div className="w-full max-w-md z-10">

          <p className="text-xs font-nunito text-muted mb-2 tracking-widest">
            START YOUR JOURNEY
          </p>

          <h1 className="text-4xl font-lora font-[400] mb-4">
            Every great trip starts with a blank page.
          </h1>

          <p className="text-muted font-nunito mb-7">
            Create your field journal — free, always,
            for the curious kind.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NAME */}

            <div>
              <label className="block text-sm mb-2">
                Full name
              </label>

              <input
                name="name"
                autoComplete="name"
                placeholder="Abhi Kainthla"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-full border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
              />
            </div>

            {/* USERNAME */}

            <div>

              <label className="block text-sm mb-2">
                Username
                <span className="text-gray-400 ml-1">
                  (optional)
                </span>
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  @
                </span>

                <input
                  name="username"
                  autoComplete="username"
                  placeholder="yourusername"
                  maxLength={20}
                  value={form.username}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full rounded-full border border-gray-300 pl-8 pr-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                />

              </div>

              <p className="text-xs text-gray-400 mt-1 ml-3">
                3–20 characters · letters, numbers and _
              </p>

            </div>

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
                  autoComplete="new-password"
                  placeholder="Create a strong password"
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

              {/* PASSWORD RULES */}

              {form.password && (
                <div className="mt-3 space-y-1 text-xs">

                  <PasswordRule
                    valid={passwordRules.length}
                    text="At least 8 characters"
                  />

                  <PasswordRule
                    valid={passwordRules.lowercase}
                    text="One lowercase letter"
                  />

                  <PasswordRule
                    valid={passwordRules.uppercase}
                    text="One uppercase letter"
                  />

                  <PasswordRule
                    valid={passwordRules.number}
                    text="One number"
                  />

                </div>
              )}

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block text-sm mb-2">
                Confirm password
              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full rounded-full border border-gray-300 px-4 py-3 pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {form.confirmPassword && (
                <div className="mt-2">

                  {form.password ===
                  form.confirmPassword ? (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <Check size={14} />
                      Passwords match
                    </p>
                  ) : (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <X size={14} />
                      Passwords do not match
                    </p>
                  )}

                </div>
              )}

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
                  Creating account...
                </>
              ) : (
                "Start your journey →"
              )}

            </button>

          </form>

          <p className="text-sm text-muted mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// PASSWORD RULE
// ==========================================

function PasswordRule({ valid, text }) {
  return (
    <p
      className={`flex items-center gap-1 ${
        valid
          ? "text-green-600"
          : "text-gray-400"
      }`}
    >
      {valid ? (
        <Check size={14} />
      ) : (
        <X size={14} />
      )}

      {text}
    </p>
  );
}