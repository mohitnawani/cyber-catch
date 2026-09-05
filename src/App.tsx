import { Routes, Route } from 'react-router'
import DashboardLayout from './layouts/DashboardLayout'
import WizardLayout from './layouts/WizardLayout'
import MainDashboard from './pages/dashboard/MainDashboard'
import XRayWizard from './pages/cyberxray/Wizard'

const App = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<MainDashboard />} />
      </Route>
      <Route element={<WizardLayout />}>
        <Route path="/cyber-xray" element={<XRayWizard />} />
      </Route>
    </Routes>
  )
}

export default App