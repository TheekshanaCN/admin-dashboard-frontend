"use client"

import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import api from "../utils/api"

export default function UserTable() {
  const { theme } = useContext(ThemeContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await api.get("/users")
      setUsers(res.data)
      setError("")
    } catch (err) {
      setError("Failed to fetch users")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <div
        className={`${theme === "dark" ? "bg-[#171717] border-gray-800" : "bg-white border-gray-200"} rounded-2xl shadow-xl overflow-hidden border transition-all duration-300`}
      >
        {/* Header */}
        <div
          className={`px-4 sm:px-6 py-4 border-b ${theme === "dark" ? "border-gray-800 bg-[#171717]" : "border-gray-200 bg-gray-50"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg sm:text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                User Management
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
                {users.length} users found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchUsers}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                    : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                }`}
                title="Refresh"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm border-b border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <svg
              className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h3
              className={`text-base sm:text-lg font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
            >
              No Users found
            </h3>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className={`${theme === "dark" ? "bg-[#171717]" : "bg-gray-50"}`}>
                  <tr>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"} uppercase tracking-wider`}
                    >
                      Name
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"} uppercase tracking-wider`}
                    >
                      Email
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"} uppercase tracking-wider`}
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${theme === "dark" ? "bg-[#171717]" : "bg-white"} divide-y ${theme === "dark" ? "divide-gray-800" : "divide-gray-200"}`}
                >
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className={`transition-colors ${theme === "dark" ? "hover:bg-gray-800/30" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-lg ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"} flex items-center justify-center mr-3`}
                          >
                            <svg
                              className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div
                              className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                            >
                              {user.name}
                            </div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              ID: {user._id.substring(0, 6)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`p-4 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} last:border-b-0`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"} flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        <svg
                          className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} truncate`}
                        >
                          {user.name}
                        </div>
                        <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                 
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}