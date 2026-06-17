"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError("Correo o contrasena incorrectos")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0F0E17" }}>
      <div className="w-full max-w-md p-8 rounded-2xl" style={{ backgroundColor: "#1A1828", border: "0.5px solid #3D2F7A" }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ backgroundColor: "#7C3AED" }}>
            <span className="text-white text-2xl font-bold">V</span>
          </div>
          <h1 className="text-2xl font-semibold" style={{ color: "#F0EEF8" }}>Bienvenido a VitaFlow</h1>
          <p className="text-sm mt-1" style={{ color: "#8B87A8" }}>Tu vida. Un solo lugar.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: "#8B87A8" }}>Correo electronico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "#221F35", border: "0.5px solid #3D2F7A", color: "#F0EEF8" }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#8B87A8" }}>Contrasena</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "#221F35", border: "0.5px solid #3D2F7A", color: "#F0EEF8" }}
            />
          </div>

          {error && <p className="text-sm text-center" style={{ color: "#F87171" }}>{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: "#7C3AED", color: "#FFFFFF", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#8B87A8" }}>
          No tienes cuenta?{" "}
          <Link href="/register" style={{ color: "#A78BFA" }}>Registrate aqui</Link>
        </p>
      </div>
    </div>
  )
}