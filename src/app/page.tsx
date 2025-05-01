"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="flex min-h-screen justify-center items-center p-4">
      <header className="bg-orange-300 rounded-xl overflow-hidden shadow-2xl w-full max-w-5xl flex flex-col lg:flex-row">
        <section className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <aside className="mb-6">
            <div className="text-black text-4xl font-bold">li</div>
          </aside>
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Welcome!
          </h1>
          <div className="h-1 w-12 bg-orange-100 mb-6"></div>
          <p className="text-black/70 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-orange-200 hover:bg-orange-100 text-black rounded-full px-6 py-2 w-fit ">
            Learn More
          </button>
        </section>
        <section className="lg:w-1/2 p-8 lg:p-12 bg-opacity-30 backdrop-blur-smck rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col justify-center">
          <h2 className="text-4xl font-semibold text-black text-center mb-8">
            Sign in
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-black/70 mb-1">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-black/10 border-white/20 text-black placeholder-black/50   rounded-full"
                placeholder="Introduce your UserName"
              />
              <label className="block text-sm font-medium text-black/70 mb-1">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-black/10 border-white/20 text-black placeholder-black/50 rounded-full"
                placeholder="........"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-full text-black font-medium cursor-pointer border-2"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </header>
    </main>
  );
}
