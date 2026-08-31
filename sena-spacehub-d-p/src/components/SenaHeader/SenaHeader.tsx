import './SenaHeader.css';
import { NavLink } from 'react-router-dom';

function SenaHeader() {
  return (
    <header className="sena-header">
      <div className="header-brand">
        <span className="logo-badge">SENA SpaceHub</span>
        <div>
          <p className="header-sub">Centro de Gestión de Mercados, Logística y TI</p>
        </div>
      </div>
      <div className="botones_contenedor">
        <div className="botones">
          <button >Dashboard</button>
          <button><NavLink to ="/inventario" className={({ isActive}) => isActive ? 'btn active' : 'btn'}> Inventario </NavLink></button>
          <button>préstamos</button>
          <button>Ticketera</button>
        </div>
      </div>

      <div className="botones_registro">
        <button>iniciar secion</button>
        <button>registrase</button>
      </div>
    </header>
  );
}
export default SenaHeader;