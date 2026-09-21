// 📁 src/pages/DashboardPage/DashboardPage.tsx
import type { EquipoData, PrestamoData, IncidenciaData } from '../../../types/spacehub.types';
import { useEffect, useState } from 'react';
import { getDashboardStats, type DashboardStats } from '../../services/dashboardService';

export interface DashboardPageProps {
  equipos?: EquipoData[];
  prestamos?: PrestamoData[];
  incidencias?: IncidenciaData[];
}

export default function DashboardPage() {
  

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDashboardStats()
      .then(data => setStats(data))
      .catch(err => console.error('Error al obtener métricas:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-slate-300">Cargando métricas...</div>;
  if (!stats) return <div className="p-6 text-red-400">Error al cargar la información.</div>;

return (
  <div className="p-6 space-y-6 bg-[#030712] text-slate-100 min-h-screen">
    {/* 1. TARJETAS SUPERIORES DE RESUMEN (4 COLUMNAS) */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      {/* TOTAL EQUIPOS CÓMPUTO */}
      <div className="p-5 bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-md">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Total Equipos Cómputo
        </p>
        <p className="text-3xl font-extrabold my-2 text-white">{stats.totalEquipos}</p>
        <p className="text-xs font-semibold text-emerald-400">
          • {stats.equiposOperativos} Operativos / {stats.equiposMantenimiento} Mantenimiento
        </p>
      </div>

      {/* PRÉSTAMOS ACTIVOS */}
      <div className="p-5 bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-md">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Préstamos Activos
        </p>
        <p className="text-3xl font-extrabold my-2 text-emerald-400">{stats.prestamosActivos}</p>
        <p className="text-xs text-emerald-500/90 font-medium">En uso por aprendices ADSO</p>
      </div>

      {/* OCUPACIÓN AMBIENTES */}
      <div className="p-5 bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-md">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Ocupación Ambientes
        </p>
        <p className="text-3xl font-extrabold my-2 text-sky-400">{stats.tasaOcupacionGlobal}</p>
        <p className="text-xs text-sky-500/90 font-medium">Laboratorios 301 y 302 activos</p>
      </div>

      {/* INCIDENCIAS DE HARDWARE */}
      <div className="p-5 bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-md">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Incidencias de Hardware
        </p>
        <p className="text-3xl font-extrabold my-2 text-amber-400">2</p>
        <p className="text-xs text-amber-500 font-semibold">1 Prioridad Alta / 1 Media</p>
      </div>
    </div>

    {/* 2. SECCIÓN INFERIOR EN DOS COLUMNAS */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* IZQUIERDA: TASA DE OCUPACIÓN POR LABORATORIO */}
      <div className="p-6 bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-md space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>📈</span>
            <h2 className="text-xs font-extrabold tracking-wider text-slate-200 uppercase">
              Tasa de Ocupación por Laboratorio
            </h2>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider">
            EN TIEMPO REAL
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {stats.laboratoriosOcupacion.map((lab, index) => {
            // Colores correspondientes a la captura de pantalla
            const colores = ['bg-lime-500', 'bg-sky-400', 'bg-amber-400'];
            const coloresTexto = ['text-lime-400', 'text-sky-400', 'text-amber-400'];
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{lab.nombre}</span>
                  <span className={coloresTexto[index % coloresTexto.length]}>
                    {lab.porcentaje}%
                  </span>
                </div>
                <div className="w-full bg-slate-800/70 rounded-full h-3.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${colores[index % colores.length]}`}
                    style={{ width: `${lab.porcentaje}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DERECHA: DISTRIBUCIÓN DE ESTADO E HISTORIAL */}
      <div className="p-6 bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span>📊</span>
            <h2 className="text-xs font-extrabold tracking-wider text-slate-200 uppercase">
              Distribución de Estado e Historial
            </h2>
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 tracking-wider">
            SEMANA ACTUAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Dona */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-lime-500 transition-all duration-1000"
                  strokeDasharray={`${stats.totalEquipos > 0 ? (stats.equiposOperativos / stats.totalEquipos) * 100 : 0}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-1000"
                  strokeDasharray={`${stats.totalEquipos > 0 ? (stats.equiposMantenimiento / stats.totalEquipos) * 100 : 0}, 100`}
                  strokeDashoffset={`-${stats.totalEquipos > 0 ? (stats.equiposOperativos / stats.totalEquipos) * 100 : 0}`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">{stats.totalEquipos}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  EQUIPOS
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4 text-[11px] font-bold">
              <span className="text-lime-400">• Operativos ({stats.equiposOperativos})</span>
              <span className="text-amber-400">• Mantenimiento ({stats.equiposMantenimiento})</span>
            </div>
          </div>

          {/* Contenedor Préstamos Semanales */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-300">Préstamos Semanales:</p>
            <div className="h-32 bg-[#050811] rounded-xl border border-slate-800/80 p-3 flex items-end justify-between">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((dia, idx) => (
                <span
                  key={dia}
                  className={`text-[10px] font-semibold ${
                    idx === 2 ? 'text-lime-400 font-bold' : 'text-slate-500'
                  }`}
                >
                  {dia}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
}
