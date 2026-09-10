import { useState } from 'react'
import { ChevronDown, Plus, Globe, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router'
import Button from '../../components/ui/Button'

interface DomainItem {
  id: number
  domain: string
  testsCount: number
  status: 'active' | 'pending'
}

const defaultDomains: DomainItem[] = [
  { id: 1, domain: 'hypertrends.com', testsCount: 14, status: 'active' },
  { id: 2, domain: 'hypertrends.com', testsCount: 14, status: 'active' },
  { id: 3, domain: 'hypertrends.com', testsCount: 14, status: 'active' },
  { id: 4, domain: 'api.hypertrends.com', testsCount: 10, status: 'active' },
  { id: 5, domain: 'app.hypertrends.com', testsCount: 18, status: 'active' },
  { id: 6, domain: 'auth.hypertrends.com', testsCount: 8, status: 'pending' },
  { id: 7, domain: 'portal.hypertrends.com', testsCount: 12, status: 'active' },
]

export default function FrameworkSection() {
  const [framework, setFramework] = useState('NIST')
  const [domainCategory, setDomainCategory] = useState('Domain')
  const [currentPage, setCurrentPage] = useState(1)
  const [domains, setDomains] = useState<DomainItem[]>(defaultDomains)
  const [newDomainInput, setNewDomainInput] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const navigate = useNavigate()

  const itemsPerPage = 3
  const totalPages = Math.ceil(domains.length / itemsPerPage)
  const displayedDomains = domains.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDomainInput.trim()) return
    setDomains((prev) => [
      ...prev,
      {
        id: Date.now(),
        domain: newDomainInput.trim().toLowerCase(),
        testsCount: 12,
        status: 'active',
      },
    ])
    setNewDomainInput('')
    setShowAddModal(false)
  }

  return (
    <section className="w-full max-w-[760px] py-4 overflow-x-hidden">
      {/* Title */}
      <h1 className="text-lg sm:text-xl font-bold tracking-tight text-navy">
        Select a Security Framework
      </h1>
      <p className="mt-1 text-xs leading-4 text-black">
        Network test results will be shown in accordance with the Security framework you select.
      </p>

      {/* Framework Selection */}
      <div className="mt-3 w-full max-w-[420px]">
        <label className="block text-xs font-bold text-navy">Framework</label>
        <div className="relative mt-1.5">
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="w-full appearance-none rounded-md border border-gray-light bg-white px-2.5 py-1.5 pr-8 text-xs font-medium text-navy/80 shadow-xs outline-none focus:border-brand"
          >
            <option value="NIST">NIST</option>
            <option value="ISO 27001">ISO / IEC 27001</option>
            <option value="CIS Controls">CIS Controls v8</option>
            <option value="SOC 2">SOC 2 Type II</option>
            <option value="HIPAA">HIPAA Security Rule</option>
            <option value="PCI-DSS">PCI-DSS 4.0</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/40"
          />
        </div>
      </div>

      {/* Domain Subheading */}
      <p className="mt-4 text-xs leading-4 text-black">
        Here are the Security Domains and corresponding tests that we will conduct.
      </p>

      {/* Domain Selection */}
      <div className="mt-3 w-full max-w-[420px]">
        <label className="block text-xs font-bold text-navy">Select a Security Domain</label>
        <div className="relative mt-1.5">
          <select
            value={domainCategory}
            onChange={(e) => setDomainCategory(e.target.value)}
            className="w-full appearance-none rounded-md border border-gray-light bg-white px-2.5 py-1.5 pr-8 text-xs font-medium text-navy/80 shadow-xs outline-none focus:border-brand"
          >
            <option value="Domain">Domain</option>
            <option value="Access Control">Access Control</option>
            <option value="Data Protection">Data Protection</option>
            <option value="Network Security">Network Security</option>
            <option value="Incident Response">Incident Response</option>
            <option value="Asset Management">Asset Management</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/40"
          />
        </div>
      </div>

      {/* Domains List */}
      <div className="mt-3 w-full max-w-[680px] space-y-1.5">
        {displayedDomains.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-gray-light/80 bg-white px-3 py-2 shadow-[0_2px_8px_rgba(15,41,64,0.03)] transition hover:border-brand/40 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#5E81F41A] text-brand">
                <Globe size={14} strokeWidth={1.8} className="h-3.5 w-3.5 object-contain" />
              </span>
              <span className="text-xs font-medium text-brand truncate">{item.domain}</span>
            </div>
            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-brand">
                <ShieldCheck size={12} />
                {item.testsCount} tests
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                <CheckCircle2 size={12} />
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination & Add Domain */}
      <div className="mt-3 flex flex-wrap w-full max-w-[680px] items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline"
        >
          <Plus size={14} /> Add Domain
        </button>

        <div className="flex items-center gap-2 text-xs text-navy/40">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            First
          </button>
          <span>|</span>
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`px-1 font-medium transition ${
                currentPage === pageNum ? 'font-bold text-brand' : 'hover:text-navy'
              }`}
            >
              {pageNum}
            </button>
          ))}
          <span>|</span>
          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            Last
          </button>
        </div>
      </div>

      {/* Add Domain Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-navy/20 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-4 sm:p-5 shadow-xl">
            <h3 className="text-sm font-bold text-navy">Add Domain for Framework Scan</h3>
            <p className="mt-1 text-xs text-navy/60">
              Enter the domain to run {framework} compliance checks on.
            </p>
            <form onSubmit={handleAddDomain} className="mt-3 space-y-2.5">
              <input
                type="text"
                value={newDomainInput}
                onChange={(e) => setNewDomainInput(e.target.value)}
                placeholder="e.g. secure.example.com"
                className="w-full rounded-md border border-gray-light px-2.5 py-1.5 text-xs text-navy outline-none focus:border-brand"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Domain
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          onClick={() => navigate('/cyber-check/agent')}
          className="w-[120px]"
        >
          Continue
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => navigate('/cyber-check/schedule')}
          className="text-navy/60 hover:text-navy"
        >
          Back to Schedule
        </Button>
      </div>
    </section>
  )
}
