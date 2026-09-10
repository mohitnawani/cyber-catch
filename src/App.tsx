import { Navigate, Routes, Route } from 'react-router'
import DashboardLayout from './layouts/DashboardLayout'
import CyberXRayLayout from './layouts/CyberXRayLayout'
import MainDashboard from './pages/dashboard/MainDashboard'
import SchedulePage from './pages/cyberxray/SchedulePage'
import ScanUrlsPage from './pages/cyberxray/ScanUrlsPage'
import ReviewPage from './pages/cyberxray/ReviewPage'
import Campaigns from './pages/cyberphisher/Campaigns'
import CreateCampaignPage from './pages/cyberphisher/CreateCampaignPage'
import Templates from './pages/cyberphisher/Templates'
import Users from './pages/cyberphisher/users'
import Reports from './pages/cyberphisher/Reports'
import LandingPage from './pages/cyberphisher/Landing_page'
import CyberPhisherLayout from './layouts/CyberPhisherLayout'
import OrganizationPage from './pages/organizations/OrganizationPage'
import OrganizationProductsPage from './pages/organizations/OrganizationProductsPage'
import CyberCheckPage from './pages/cyber-check/CyberCheckPage'
import ScheduleSection from './pages/cyber-check/ScheduleSection'
import FrameworkSection from './pages/cyber-check/FrameworkSection'
import AgentSection from './pages/cyber-check/AgentSection'

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
        <Route path="/cyber-check" element={<CyberCheckPage />}>
          <Route index element={<Navigate to="/cyber-check/schedule" replace />} />
          <Route path="schedule" element={<ScheduleSection />} />
          <Route path="framework" element={<FrameworkSection />} />
          <Route path="agent" element={<AgentSection />} />
        </Route>
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/organization/:organizationId" element={<OrganizationProductsPage />} />
        <Route path="/cyber-phisher" element={<Navigate to="/cyber-phisher/campaigns" replace />} />
        <Route element={<CyberPhisherLayout />}>
          <Route path="/cyber-phisher/campaigns" element={<Campaigns />} />
          <Route path="/cyber-phisher/campaigns/create" element={<CreateCampaignPage />} />
          <Route path="/cyber-phisher/users" element={<Users />} />
          <Route path="/cyber-phisher/templates" element={<Templates />} />
          <Route path="/cyber-phisher/reports" element={<Reports />} />
          <Route path="/cyber-phisher/landing-pages" element={<LandingPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
