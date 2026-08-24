import './SenaHeader.css';
import { NavLink } from 'react-router-dom';

function SenaHeader() {
  return (
    <header className="sena-header">
      <div className="header-brand">
        <span className="logo-badge">SENA SpaceHub</span>
        <div>
          <h1 className="header-title">Portal del Aprendiz ADSO</h1>
          <p className="header-sub">Centro de Gestión de Mercados, Logística y Tecnologías de la Información</p>
        </div>
      </div>

      <div>
        <button >Dashboard</button>
        <button><NavLink to ="/inventario" className={({ isActive}) => isActive ? 'btn active' : 'btn'}> Inventario </NavLink></button>
        <button>préstamos</button>
        <button>Ticketera</button>
      </div>

      <div>
        <button>iniciar secion</button>
        <button>registrase</button>
      </div>
    </header>
  );
}
export default SenaHeader;