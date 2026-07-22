import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  PlusCircle,
  Building2,
  Users,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contextApi/AuthContext";

const AdminAsideSection = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { type: "link", path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { type: "category", label: "MANAGEMENT" },
    { type: "link", path: "/admin/addproperty", label: "Add Property", icon: PlusCircle },
    { type: "link", path: "/admin/viewproperty", label: "View Properties", icon: Building2 },
    { type: "link", path: "/admin/addteam", label: "Add Team Member", icon: UserPlus },
    { type: "link", path: "/admin/allteam", label: "View Team", icon: Users },
    { type: "link", path: "/admin/addblog", label: "Add Blog Post", icon: PlusCircle },
    { type: "link", path: "/admin/addnews", label: "Add News Article", icon: PlusCircle },
    { type: "link", path: "/admin/addgallery", label: "Add Gallery Album", icon: PlusCircle },
  ];

  const logoutHandle = () => logout();

  return (
    <>
      {/* Mobile top bar with hamburger - only visible below lg */}
      <div className="lg:hidden flex items-center justify-between bg-[#374256] text-white px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-sm">NCR Admin</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          bg-[#374256] text-gray-300 flex flex-col justify-between font-sans
          w-72 lg:w-80 min-h-screen
          fixed lg:sticky top-0 lg:top-0 left-0 z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div>
          <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-[#2d3d56]">
            <Home className="w-6 h-6 text-blue-400" />
            <span className="text-md font-semibold tracking-wide text-white">
              NCR<span className="text-gray-400 ms-2">Admin</span>
            </span>
          </div>

          <nav className="mt-4 px-3 space-y-1 pb-4">
            {navItems.map((item, index) => {
              if (item.type === "category") {
                return (
                  <div
                    key={index}
                    className="px-3 pt-4 pb-2 text-xs font-bold tracking-wider text-gray-500 uppercase"
                  >
                    {item.label}
                  </div>
                );
              }

              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? "bg-[#2b3c56] text-white font-semibold"
                      : "hover:bg-[#28374f] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r" />
                  )}
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                      isActive ? "text-blue-400" : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#2d3d56] bg-[#374256]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg font-mono">
              NCR
            </div>
            <div className="flex-1 overflow-hidden">
              <h5 className="text-sm font-medium text-white truncate">NCR Space Connect</h5>
              <p className="text-xs text-gray-400 truncate">ncr@realestate.com</p>
              <button
                onClick={logoutHandle}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 mt-1"
              >
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminAsideSection;
