"use client"

import { useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Sidebar from "../components/Sidebar"
import UserTable from "../components/UserTable"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme } = useContext(ThemeContext)

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`flex-1 lg:ml-0 ${theme === "dark" ? "bg-[#171717]" : "bg-gray-50"} transition-colors duration-300`}
      >
        {/* Header */}
        <div
          className={`${theme === "dark" ? "bg-[#171717] border-gray-800" : "bg-white border-gray-200"} border-b px-4 sm:px-6 py-4 sticky top-0 z-30`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  User Management
                </h1>
                <p
                  className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1 hidden sm:block`}
                >
                  Manage your users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <UserTable />
        </div>
      </div>
    </div>
  )
}
