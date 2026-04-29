import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerService } from "../services/auth.service";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await registerService(form);
      toast.success("Account created 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1554357475-accb8a88a330?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <p className="text-xl italic leading-relaxed">
            “The world is a book and those who do not travel read only one page.”
          </p>
          <p className="mt-3 text-sm opacity-80">
            — St. Augustine
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-6 py-16 sm:px-12 bg-grain">
        <div className="w-full max-w-md z-10">

          <p className="text-sm text-muted mb-2 tracking-widest">
            START YOUR JOURNEY
          </p>

          <h1 className="text-4xl font-serif font-semibold mb-6">
            Create your Trail&Tales account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-full border px-4 py-3"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-full border px-4 py-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-full border px-4 py-3"
            />

            <button
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full font-medium hover:opacity-90 cursor-pointer"
            >
              {loading ? "Creating..." : "Start your journey →"}
            </button>
          </form>

          <p className="text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
