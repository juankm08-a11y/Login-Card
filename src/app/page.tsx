"use client";

import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      console.error("Error en el server");
      alert("Credenciales invalidas");
      return;
    }

    const { token } = await res.json();
    console.log("JWT", token);
    alert("¡Correo enviado!");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <header className="bg-blue-200 rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden transition-all duration-500 ease-in-out">
        <section className="overflow-hidden lg:flex-col lg:justify-center lg:w-1/2 bg-blue-500 text-white p-10 transition-colors duration-500">
          <aside className="text-4xl font-bold mb-4">
            <div className="text-black text-4xl font-bold text-center">
              Login Card
            </div>
          </aside>
          <h1 className="text-4xl text-black mb-4 font-bold text-center">
            Welcome!
          </h1>
          <p className="text-lg text-black opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>
        <section className="lg:w-1/2 p-8 lg:p-12 bg-opacity-30 backdrop-blur-smck rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col justify-center transition-all duration-500 ease-in-out">
          <h2 className="text-4xl font-semibold text-black text-center mb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <FaUser className="absolute-top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 oy-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-shadow duration-300 hover:shadow-md"
                placeholder="Introduce your UserName"
              />
            </div>
            <div className="relative group">
              <FaLock className="absolute-top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 oy-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-shadow duration-300 hover:shadow-md"
                placeholder="........"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue hover:bg-blue-600 text-black font-semibold py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Submit
            </button>
          </form>
        </section>
      </header>
    </main>
  );
}
