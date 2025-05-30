"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dashboard, People, School, Payment, Support, Settings, ExitToApp, Menu, Close } from "@mui/icons-material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

const menuItems = [
  { icon: Dashboard, label: "Dashboard", href: "/admin" },
  { icon: People, label: "Users", href: "/admin/users" },
  { icon: School, label: "Courses", href: "/admin/courses" },
  { icon: Payment, label: "Payments", href: "/admin/payments" },
  { icon: Support, label: "Support", href: "/admin/support" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <School className="text-blue-400" />
              <span className="font-bold">Webitya Admin</span>
            </div>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 hover:bg-gray-700 rounded">
            {isCollapsed ? <Menu /> : <Close />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 p-3 w-full text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          <ExitToApp />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  )
}
