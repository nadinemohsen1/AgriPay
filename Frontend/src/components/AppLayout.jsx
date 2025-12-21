import { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar"; 
import "./AppLayout.css";

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Page content */}
        <div className="content-area">{children}</div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
}
