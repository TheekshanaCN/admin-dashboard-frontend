"use client"

import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import EditItemForm from "./EditItemForm"
import api from "../utils/api"

export default function ItemTable() {
  const { theme } = useContext(ThemeContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await api.get("/items")
      setItems(res.data)
      setError("")
    } catch (err) {
      setError("Failed to fetch items")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return

    try {
      await api.delete(`/items/${id}`)
      fetchItems()
    } catch (err) {
      setError("Failed to delete item")
      console.error(err)
    }
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleItemUpdated = () => {
    fetchItems()
    setShowEditModal(false)
    setSelectedItem(null)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedItem(null)
  }

  useEffect(() => {
    fetchItems()
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
                Items Management
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
                {items.length} items in your inventory
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchItems}
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
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading items...</p>
          </div>
        ) : items.length === 0 ? (
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3
              className={`text-base sm:text-lg font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
            >
              No items found
            </h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
              Get started by adding your first item to the inventory
            </p>
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
                      Price
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"} uppercase tracking-wider`}
                    >
                      Description
                    </th>
                    <th
                      className={`px-6 py-4 text-right text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"} uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${theme === "dark" ? "bg-[#171717]" : "bg-white"} divide-y ${theme === "dark" ? "divide-gray-800" : "divide-gray-200"}`}
                >
                  {items.map((item, index) => (
                    <tr
                      key={item._id}
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
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                          <div>
                            <div
                              className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                            >
                              {item.name}
                            </div>
                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              Item #{index + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-lg font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                          ${item.price?.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"} max-w-xs`}>
                          {item.description || (
                            <span className={`italic ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                              No description
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "text-blue-400 hover:bg-blue-900/20" : "text-blue-600 hover:bg-blue-50"}`}
                            title="Edit item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"}`}
                            title="Delete item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {items.map((item, index) => (
                <div
                  key={item._id}
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
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} truncate`}
                        >
                          {item.name}
                        </div>
                        <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          Item #{index + 1}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-lg font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"} ml-2`}
                    >
                      ${item.price?.toFixed(2)}
                    </span>
                  </div>

                  {item.description && (
                    <div
                      className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-3 line-clamp-2`}
                    >
                      {item.description}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        theme === "dark" ? "text-blue-400 hover:bg-blue-900/20" : "text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        theme === "dark" ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className={`${theme === "dark" ? "bg-[#171717] border-gray-800" : "bg-white"} rounded-2xl p-4 sm:p-6 w-full max-w-md relative shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto`}
          >
            <button
              onClick={handleCloseEditModal}
              className={`absolute top-4 right-4 ${theme === "dark" ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-500"} text-xl transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <EditItemForm item={selectedItem} onItemUpdated={handleItemUpdated} onClose={handleCloseEditModal} />
          </div>
        </div>
      )}
    </>
  )
}
