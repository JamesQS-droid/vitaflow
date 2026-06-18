"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import Link from "next/link"

export default function RegisterPage() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async () => {
    setLoading(true)
    setError("")

    if (!nombre || !email || !password) {
      setError("Completa todos los campos")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } }
    })

    if (error) {
      setError("Error al crear la cuenta. Intenta de nuevo.")
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
          <h1 className="text-2xl font-semibold" style={{ color: "#F0EEF8" }}>Crear cuenta</h1>
          <p className="text-sm mt-1" style={{ color: "#8B87A8" }}>Empieza tu transformacion hoy</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: "#8B87A8" }}>Nombre completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="James Quispe"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "#221F35", border: "0.5px solid #3D2F7A", color: "#F0EEF8" }}
            />
          </div>
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
              placeholder="Minimo 6 caracteres"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "#221F35", border: "0.5px solid #3D2F7A", color: "#F0EEF8" }}
            />
          </div>

          {error && <p className="text-sm text-center" style={{ color: "#F87171" }}>{error}</p>}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: "#7C3AED", color: "#FFFFFF", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#8B87A8" }}>
          Ya tienes cuenta?{" "}
          <Link href="/login" style={{ color: "#A78BFA" }}>Inicia sesion</Link>
        </p>
      </div>
    </div>
  )
}