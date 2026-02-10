// // import { useState } from "react";

// // export default function Login() {
// //   const [role, setRole] = useState("victim");

// //   return (
// //     <div className="min-h-screen flex bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      
// //       {/* Left Branding Section */}
// //       <div className="hidden lg:flex w-1/2 items-center justify-center bg-blue-600/20 backdrop-blur-xl p-12">
// //         <div className="max-w-md">
// //           <h1 className="text-4xl font-bold mb-4">
// //             ResQHub
// //           </h1>
// //           <p className="text-xl font-semibold mb-4">
// //             AI-Assisted Coordination for Rapid Emergency Response
// //           </p>
// //           <p className="text-slate-300">
// //             The mission-critical platform for victims, responders, and administrators to synchronize efforts when every second counts.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Right Login Section */}
// //       <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
// //         <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-700">
          
// //           <h2 className="text-2xl font-bold mb-2">Secure Portal</h2>
// //           <p className="text-slate-400 mb-6">
// //             Log in to the disaster management dashboard.
// //           </p>

// //           {/* Role Selection */}
// //           <div className="flex mb-6 bg-slate-800 rounded-lg p-1">
// //             {["victim", "responder", "admin"].map((item) => (
// //               <button
// //                 key={item}
// //                 onClick={() => setRole(item)}
// //                 className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
// //                   role === item
// //                     ? "bg-blue-600 text-white"
// //                     : "text-slate-400 hover:text-white"
// //                 }`}
// //               >
// //                 {item.charAt(0).toUpperCase() + item.slice(1)}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Email */}
// //           <div className="mb-4">
// //             <label className="block text-sm mb-2">Email Address</label>
// //             <input
// //               type="email"
// //               placeholder="name@agency.org"
// //               className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
// //             />
// //           </div>

// //           {/* Password */}
// //           <div className="mb-6">
// //             <label className="block text-sm mb-2">Password</label>
// //             <input
// //               type="password"
// //               placeholder="Enter your password"
// //               className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
// //             />
// //           </div>

// //           {/* Login Button */}
// //           <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">
// //             Sign In to Dashboard →
// //           </button>

// //           <p className="text-sm text-slate-400 mt-6 text-center">
// //             Don’t have an account?{" "}
// //             <span className="text-blue-500 cursor-pointer">
// //               Register
// //             </span>
// //           </p>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [role, setRole] = useState("victim");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Temporary frontend login (for demo)
    const userData = { email, role };

    // Save user in AuthContext
    login(userData);

    // Role-based redirect
    if (userData.role === "admin") {
      navigate("/admin/dashboard");
    } else if (userData.role === "responder") {
      navigate("/responder/dashboard");
    } else {
      navigate("/victim/dashboard");
    }
  };

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
          <button className="px-6 py-2 border-b-2 border-blue-500 text-blue-400">
            Log In
          </button>
          <Link
            to="/register"
            className="px-6 py-2 text-gray-400 hover:text-white"
          >
            Register
          </Link>
        </div>

        <h2 className="text-xl font-semibold mb-6">Secure Portal</h2>

        <form onSubmit={handleSubmit}>
          
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {["victim", "responder", "admin"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`p-2 rounded-lg border text-sm capitalize transition
                  ${
                    role === r
                      ? "border-blue-500 bg-blue-600/20 text-blue-400"
                      : "border-gray-700 bg-[#132a40]"
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
              placeholder="name@agency.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#132a40] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#132a40] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-xl font-semibold shadow-lg"
          >
            Sign In →
          </button>

        </form>
      </div>
    </div>
  );
}




