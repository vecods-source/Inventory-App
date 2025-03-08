"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Menu } from "lucide-react";
import React from "react";

function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassNames}>
      {/* LOGO */}
      <div
        className={`pt-8 flex justify-between items-center gap-3 md:justify-normal ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>LOGO</div>
        <h1
          className={`font-extrabold text-2x ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          SDTRADE
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8"></div>
      {/* Footerr */}
      <div className={``}>
        <p className="text-center text-xs text-gray-500">@copy; 2024 SDTRADE</p>{" "}
      </div>
    </div>
  );
}

export default Sidebar;
