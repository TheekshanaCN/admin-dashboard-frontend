"use client"

import { useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import api from "../utils/api"

export default function AddItemForm({ onItemAdded, onClose }) {
  const { theme } = useContext(ThemeContext)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.price) {
      setError("Name and price are required")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await api.post("/items", {
        ...formData,
        price: Number(formData.price),
      })

      setFormData({ name: "", price: "", description: "" })
      setSuccess("Item added successfully!")

      if (onItemAdded) {
        onItemAdded(response.data)
      }

      setTimeout(() => {
        setSuccess("")
        if (onClose) onClose()
      }, 1000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6">
        <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-2`}>
          Add New Item
        </h2>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Fill in the details below to add a new item to your inventory
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 sm:p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label
            htmlFor="name"
            className={`block text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"} mb-2`}
          >
            Item Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 text-sm sm:text-base ${
              theme === "dark"
                ? "bg-[#171717] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className={`block text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"} mb-2`}
          >
            Price *
          </label>
          <div className="relative">
            <span
              className={`absolute left-3 sm:left-4 top-2.5 sm:top-3.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} font-medium text-sm sm:text-base`}
            >
              $
            </span>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 text-sm sm:text-base ${
                theme === "dark"
                  ? "bg-[#171717] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className={`block text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"} mb-2`}
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter item description (optional)"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 resize-none text-sm sm:text-base ${
              theme === "dark"
                ? "bg-[#171717] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-white font-semibold transition-all duration-200 text-sm sm:text-base ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </span>
            ) : (
              "Add Item"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
              theme === "dark"
                ? "text-gray-300 border border-gray-700 hover:bg-gray-800/50"
                : "text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
