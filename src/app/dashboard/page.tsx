"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [nombre, setNombre] = useState("")
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      } else {
        setNombre(user.user_metadata?.nombre || user.email || "")
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#0F0E17" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#7C3AED" }}>
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-xl font-semibold" style={{ color: "#F0EEF8" }}>VitaFlow</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm"
            style={{ backgroundColor: "#221F35", color: "#8B87A8", border: "0.5px solid #3D2F7A" }}
          >
            Cerrar sesion
          </button>
        </div>

        {/* Bienvenida */}
        <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: "#1A1828", border: "0.5px solid #3D2F7A" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#7C3AED" }}>
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <span className="text-sm font-medium" style={{ color: "#A78BFA" }}>Vita</span>
          </div>
          <p style={{ color: "#F0EEF8" }}>
            Hola {nombre}! Bienvenido a VitaFlow. Tu viaje empieza hoy. Que modulo quieres activar primero?
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Calorias hoy", value: "-- kcal", sub: "Meta: 2,200" },
            { label: "Peso actual", value: "-- kg", sub: "Registra tu peso" },
            { label: "Balance", value: "S/. --", sub: "Este mes" },
          ].map((card, i) => (
            <div key={i} className="p-5 rounded-2xl" style={{ backgroundColor: "#1A1828", border: "0.5px solid #3D2F7A" }}>
              <p className="text-sm mb-2" style={{ color: "#8B87A8" }}>{card.label}</p>
              <p className="text-2xl font-semibold mb-1" style={{ color: "#F0EEF8" }}>{card.value}</p>
              <p className="text-xs" style={{ color: "#A78BFA" }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Modulos */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { nombre: "Control Fisico", desc: "Peso, medidas, gym y nutricion", emoji: "🏋️" },
            { nombre: "Control Financiero", desc: "Ingresos, gastos y metas de ahorro", emoji: "💰" },
            { nombre: "Habitos", desc: "Pomodoro, sueno y rachas", emoji: "📚" },
            { nombre: "Reportes", desc: "Tu progreso en graficas y PDF", emoji: "📊" },
          ].map((mod, i) => (
            <div key={i} className="p-6 rounded-2xl cursor-pointer" style={{ backgroundColor: "#1A1828", border: "0.5px solid #3D2F7A" }}>
              <span className="text-3xl mb-3 block">{mod.emoji}</span>
              <p className="font-semibold mb-1" style={{ color: "#F0EEF8" }}>{mod.nombre}</p>
              <p className="text-sm" style={{ color: "#8B87A8" }}>{mod.desc}</p>
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs" style={{ backgroundColor: "#2D1F5E", color: "#A78BFA" }}>
                Proximamente
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}