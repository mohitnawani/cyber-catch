import { Navigate, Routes, Route } from 'react-router'
import DashboardLayout from './layouts/DashboardLayout'
import CyberXRayLayout from './layouts/CyberXRayLayout'
import MainDashboard from './pages/dashboard/MainDashboard'
import SchedulePage from './pages/cyberxray/SchedulePage'
import ScanUrlsPage from './pages/cyberxray/ScanUrlsPage'
import ReviewPage from './pages/cyberxray/ReviewPage'

function ProductPage({ title }: { title: string }) {
  return (
    <section className="rounded-2xl border border-gray-light bg-white-pure p-6 shadow-[0_2px_12px_rgba(15,41,64,0.06)]">
      <h1 className="text-xl font-bold text-navy">{title}</h1>
      <p className="mt-2 text-sm text-navy/60">This product area is ready for its dashboard content.</p>
    </section>
  )
}

const App = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/cyber-xray" element={<Navigate to="/cyber-xray/schedule" replace />} />
        <Route element={<CyberXRayLayout />}>
          <Route path="/cyber-xray/schedule" element={<SchedulePage />} />
          <Route path="/cyber-xray/scan-urls" element={<ScanUrlsPage />} />
          <Route path="/cyber-xray/review" element={<ReviewPage />} />
        </Route>
        <Route path="/cyber-check" element={<ProductPage title="Cyber Check" />} />
        <Route path="/cyber-phisher" element={<ProductPage title="Cyber Phisher" />} />
      </Route>
    </Routes>
  )
}

export default App
