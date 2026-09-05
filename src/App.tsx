import { Routes, Route } from 'react-router'
import DashboardLayout from './layouts/DashboardLayout'
import MainDashboard from './pages/dashboard/MainDashboard'
import XRayWizard from './pages/cyberxray/Wizard'

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
        <Route path="/cyber-xray" element={<XRayWizard />} />
        <Route path="/cyber-check" element={<ProductPage title="Cyber Check" />} />
        <Route path="/cyber-phisher" element={<ProductPage title="Cyber Phisher" />} />
      </Route>
    </Routes>
  )
}

export default App
