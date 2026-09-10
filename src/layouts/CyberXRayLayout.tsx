import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Layers, ChevronRight } from 'lucide-react'
import Cyberxraybar from '../components/ui/Cyberxraybar'
import cross from '../assets/cross.png'

export default function CyberXRayLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const currentStep = pathname.includes('scan-urls')
    ? 'Scan URLs'
    : pathname.includes('review')
    ? 'Review'
    : 'Schedule'

  return (
    <div className="flex min-h-[calc(100vh-32px)] max-w-[1440px] flex-col gap-3 overflow-hidden px-3 py-3 mx-auto sm:px-4 lg:flex-row lg:gap-5 lg:px-0 lg:py-0">
      {/* Mobile/Tablet Steps Toggle Header */}
      <div className="flex lg:hidden items-center justify-between gap-2 rounded-xl border border-gray-light bg-white px-3 py-2 shadow-xs">
        <div className="flex min-w-0 items-center gap-2">
          <img src={cross} alt="Cyber X-Ray" className="h-5 w-5 shrink-0 object-contain" />
          <div className="flex min-w-0 items-center gap-1 text-[11px]">
            <span className="truncate font-semibold text-navy/50">Cyber X-Ray</span>
            <ChevronRight size={12} className="shrink-0 text-navy/30" />
            <span className="truncate font-bold text-brand">{currentStep}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-brand/20 bg-blue-50/80 px-2.5 py-1 text-[11px] font-semibold text-brand transition hover:bg-blue-100"
        >
          <Layers size={13} />
          <span>Switch Step</span>
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
        className={`fixed top-0 left-0 z-50 h-full w-[240px] max-w-[85vw] bg-white transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Cyberxraybar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Desktop Permanent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Cyberxraybar />
      </div>

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto py-2 sm:py-3 lg:py-4">
        <Outlet />
      </main>
    </div>
  )
}
