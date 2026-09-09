import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Layers, ChevronRight } from 'lucide-react'
import CyberFisherbar from '../components/ui/Cyberfisherbar'
import cross from '../assets/cross.png'

export default function CyberPhisherLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const currentStep = pathname.includes('users')
    ? 'Users'
    : pathname.includes('templates')
    ? 'Templates'
    : pathname.includes('landing-pages')
    ? 'Landing Pages'
    : pathname.includes('reports')
    ? 'Reports'
    : 'Campaigns'

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-32px)] gap-4 lg:gap-8 max-w-[1440px] mx-auto">
      {/* Mobile/Tablet Steps Toggle Header */}
      <div className="flex lg:hidden items-center justify-between rounded-xl border border-gray-light bg-white px-4 py-2.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <img src={cross} alt="Cyber Phisher" className="h-6 w-6 object-contain" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-navy/50">Cyber Phisher</span>
            <ChevronRight size={12} className="text-navy/30" />
            <span className="font-bold text-brand">{currentStep}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-blue-100"
        >
          <Layers size={14} />
          <span>Navigation</span>
        </button>
      </div>

      {/* Mobile/Tablet Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile/Tablet Drawer Container */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[260px] max-w-[85vw] bg-white transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <CyberFisherbar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Desktop Permanent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <CyberFisherbar />
      </div>

      {/* Main Content */}
      <main className="min-w-0 flex-1 py-1 lg:py-5 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
