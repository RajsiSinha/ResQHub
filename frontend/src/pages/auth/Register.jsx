import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("victim");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c2d] to-[#091420] text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-[#0f2235] rounded-2xl p-8 shadow-2xl border border-blue-900">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-2xl font-bold">
            +
          </div>
          <h1 className="text-2xl font-bold mt-4">ResQHub</h1>
          <p className="text-gray-400 text-sm">
            Disaster Management & Response
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-gray-700">
          <Link
            to="/login"
            className="px-6 py-2 text-gray-400 hover:text-white"
          >
            Log In
          </Link>
          <button className="px-6 py-2 border-b-2 border-blue-500 text-blue-400">
            Register
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6">
          Join the network to help or request aid.
        </p>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {["victim", "volunteer", "ngo", "authority"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-4 rounded-xl border transition-all capitalize font-medium
                ${
                  role === r
                    ? "border-blue-500 bg-blue-600/20 text-blue-400"
                    : "border-gray-700 bg-[#132a40] hover:border-blue-500"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full p-3 rounded-lg bg-[#132a40] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm mb-2 text-gray-300">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a secure password"
            className="w-full p-3 rounded-lg bg-[#132a40] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-xs text-gray-500 mb-6">
          Must be at least 8 characters
        </p>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-xl font-semibold shadow-lg">
          Create Account →
        </button>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
