import { Navigation } from "./Navigation";
import "./../css/Layout.css"; // CSS que veremos abajo

export const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navigation />
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};