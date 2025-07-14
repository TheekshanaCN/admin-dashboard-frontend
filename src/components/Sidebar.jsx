"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useContext(ThemeContext)

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const navItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      path: "#",
      name: "Items",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
    {
      path: "##",
      name: "Users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
  ]

  const isActive = (path) => location.pathname === path

  const handleLinkClick = () => {
    if (onClose) onClose() // Close mobile menu when link is clicked
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`${
          theme === "dark" ? "bg-[#171717] border-gray-700" : "bg-white border-gray-200"
        } fixed lg:static inset-y-0 left-0 z-50 w-64 min-h-screen p-4 lg:p-6 flex flex-col border-r shadow-lg transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className={`lg:hidden absolute top-4 right-4 p-2 rounded-lg ${
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-6 lg:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className={`text-lg lg:text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Admin Panel
              </h2>
            </div>
          </div>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>Welcome back, Admin!</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 lg:space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? theme === "dark"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-3 transition-colors ${
                  isActive(item.path)
                    ? theme === "dark"
                      ? "text-white"
                      : "text-blue-600"
                    : theme === "dark"
                      ? "text-gray-400 group-hover:text-blue-400"
                      : "text-gray-500 group-hover:text-blue-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium text-sm lg:text-base">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2 lg:space-y-3 pt-4 lg:pt-6 border-t border-gray-200 dark:border-gray-700">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
              theme === "dark"
                ? "bg-gray-800/50 hover:bg-gray-800 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {theme === "dark" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 lg:h-5 lg:w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Light Mode</span>
                <span className="sm:hidden">Light</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 lg:h-5 lg:w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span className="hidden sm:inline">Dark Mode</span>
                <span className="sm:hidden">Dark</span>
              </>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-3 lg:px-4 py-2.5 lg:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
