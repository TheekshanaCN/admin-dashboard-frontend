"use client"

import { useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Sidebar from "../components/Sidebar"
import ItemTable from "../components/ItemTable"
import AddItemForm from "../components/AddItemForm"

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false)
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
                  Product Management
                </h1>
                <p
                  className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1 hidden sm:block`}
                >
                  Manage your inventory and product catalog
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">Add New Item</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <ItemTable />
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div
              className={`${theme === "dark" ? "bg-[#171717] border-gray-800" : "bg-white"} rounded-2xl p-4 sm:p-6 w-full max-w-md relative shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto`}
            >
              <button
                onClick={() => setShowModal(false)}
                className={`absolute top-4 right-4 ${theme === "dark" ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-500"} text-xl transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <AddItemForm onClose={() => setShowModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
