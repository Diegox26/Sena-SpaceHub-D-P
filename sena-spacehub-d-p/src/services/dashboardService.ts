import { apiFetch } from './api';

// Interfaz TypeScript que describe la respuesta del backend
export interface DashboardStats {
  totalEquipos: number;
  equiposOperativos: number;
  equiposMantenimiento: number;
  prestamosActivos: number;
  tasaOcupacionGlobal: string;
  incidencias: {
    total: number;
    alta: number;
    media: number;
  };
  laboratoriosOcupacion: Array<{
    nombre: string;
    porcentaje: number;
    activo: boolean;
  }>;
}

// Función que consume el endpoint /dashboard/stats
export const getDashboardStats = async (): Promise<DashboardStats> => {
  return await apiFetch('/dashboard/stats');
};