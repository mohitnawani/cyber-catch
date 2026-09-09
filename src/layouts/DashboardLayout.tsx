import { useState } from 'react'
import { Outlet } from 'react-router'
import { User, Menu, X } from 'lucide-react'
import Sidebar from '../components/ui/Sidebar'

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-navy flex flex-col lg:flex-row">
      {/* Mobile/Tablet Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-navy/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar (Drawer on mobile/tablet, fixed column on desktop) */}
      <div
        className={`fixed left-0 top-0 z-40 h-full transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[107px] min-w-0 transition-all">
        {/* Mobile / Tablet Header with Menu Toggle */}
        <header className="h-14 bg-white-pure border-b border-gray-light flex items-center px-4 justify-between sticky top-0 z-20 lg:hidden shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 -ml-1.5 text-navy/70 hover:text-navy rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-bold text-navy text-sm">CyberCatch</span>
          </div>
          <User size={18} className="text-navy/70" />
        </header>

        <main className="p-3 sm:p-5 lg:p-6 bg-[#F6F7F9] min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-32px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
