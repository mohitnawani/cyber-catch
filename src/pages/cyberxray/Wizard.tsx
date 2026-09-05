import EmptyStateCard from '../../components/ui/EmptyStateCard'
import Sidebar from '../../components/ui/Sidebar'

export default function Wizard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Column 1: Far-left sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <Sidebar currentPage="cyber-xray" onNavItemClick={() => {}} />
          <div className="mt-auto">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
              You
            </div>
          </div>
        </aside>

        {/* Column 2: Wizard step rail */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
                W
              </div>
              <h2 className="font-bold text-lg text-indigo-700">Welcome to Cyber X-Ray!</h2>
            </div>
            <div className="mt-4 space-y-1">
              <div
                className="flex items-center gap-2 py-2 px-3 rounded bg-indigo-50 text-sm font-bold text-indigo-600"
              >
                <span className="w-3 h-3 rounded-full bg-indigo-600">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <span>Schedule</span>
              </div>
              <div
                className="flex items-center gap-2 py-2 px-3 rounded bg-indigo-50 text-sm font-bold text-indigo-600"
              >
                <span className="w-3 h-3 rounded-full bg-indigo-500">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <span>Scan URLs</span>
              </div>
              <div className="flex items-center gap-2 py-2 px-3 rounded bg-gray-50 text-sm text-gray-400">
                <span className="w-3 h-3 rounded-full bg-gray-300">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <span>Review</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Column 3: Main content panel */}
        <main className="flex-1 bg-gray-50 p-8">
          <EmptyStateCard
            heading="Setup Scan URLs"
            body="These are URLs that our system will scan for vulnerabilities on a period basis."
            subHeading="To finalize URL Setup"
            checklist={[
              {
                text: "We will need confirmation that you own the domains we will scan.",
              },
              {
                text: "You will need access to your DNS Host to confirm your domain.",
              },
            ]}
            primaryCTA="Add URLs"
            primaryOnClick={() => alert('Adding URLs...')}
            secondaryCTA="Skip for now, I'll add later"
            secondaryOnClick={() => alert('Skip action')}
          />
        </main>
      </div>
    </div>
  )
}