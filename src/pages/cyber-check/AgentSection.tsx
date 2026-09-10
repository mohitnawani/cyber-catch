import { useState } from 'react'
import { Info, Check, Copy, Download } from 'lucide-react'
import { useNavigate } from 'react-router'
import Button from '../../components/ui/Button'

export default function AgentSection() {
  const [clientId, setClientId] = useState('2d872b8f-7e42-4b9b-b7d3-878bdaff1a78')
  const [clientSecret, setClientSecret] = useState('e60882e4-0480-4fc0-bcac-9d88979dcf85')
  const [copiedId, setCopiedId] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const navigate = useNavigate()

  const copyToClipboard = (text: string, type: 'id' | 'secret') => {
    navigator.clipboard.writeText(text)
    if (type === 'id') {
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    } else {
      setCopiedSecret(true)
      setTimeout(() => setCopiedSecret(false), 2000)
    }
  }

  const handleRegenerate = () => {
    const randomHex = () => Math.random().toString(36).substring(2, 10)
    setClientId(`${randomHex()}-${randomHex()}-4b9b-b7d3-${randomHex()}`)
    setClientSecret(`${randomHex()}-0480-4fc0-bcac-${randomHex()}`)
  }

  return (
    <section className="max-w-[760px] py-6 ">
      {/* Top Title & Regenerate Button */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-navy">
          Your CyberCheck 24/7 Agent Credentials
        </h1>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            onClick={handleRegenerate}
            className="px-3"
          >
            Regenerate
          </Button>
          <Info size={14} className="text-navy/40" />
        </div>
      </div>

      <p className="mt-1 text-xs leading-4 text-navy/70">
        Here are your CyberCheck 24/7 Agent credentials.
      </p>

      {/* Credentials Information */}
      <div className="mt-4">
        <h2 className="text-[13px] font-bold text-navy">
          Here are your ID and Secret for the Agent
        </h2>
        <p className="mt-1 text-xs leading-4 text-navy/60">
          When you run the agent, you will be prompted to enter the ID and secret. Copy them and have them handy.
        </p>

        {/* Client ID */}
        <div className="mt-3">
          <label className="block text-xs font-bold text-navy">Client ID</label>
          <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 max-w-[480px]">
            <span className="font-mono text-xs text-navy/80 select-all break-all">{clientId}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(clientId, 'id')}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-brand px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand/5 self-start sm:self-auto shrink-0"
            >
              {copiedId ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              {copiedId ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Client Secret */}
        <div className="mt-3">
          <label className="block text-xs font-bold text-navy">Client Secret</label>
          <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 max-w-[480px]">
            <span className="font-mono text-xs text-navy/80 select-all break-all">{clientSecret}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(clientSecret, 'secret')}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-brand px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand/5 self-start sm:self-auto shrink-0"
            >
              {copiedSecret ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              {copiedSecret ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Download Action Cards */}
      <div className="mt-4 space-y-1.5 w-full max-w-[680px]">
        {/* Card 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-gray-light bg-white p-3 shadow-[0_2px_8px_rgba(15,41,64,0.03)]">
          <div className="min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
              DOWNLOAD CREDENTIALS
            </h3>
            <p className="mt-0.5 text-xs leading-4 text-navy/60">
              You can always download these and save them in a safe place for later use.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const element = document.createElement('a')
              const file = new Blob([`Client ID: ${clientId}\nClient Secret: ${clientSecret}`], {
                type: 'text/plain',
              })
              element.href = URL.createObjectURL(file)
              element.download = 'cybercheck-credentials.txt'
              document.body.appendChild(element)
              element.click()
            }}
            className="w-full sm:w-auto shrink-0 rounded-md border border-brand px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand/5 inline-flex items-center justify-center gap-1"
          >
            <Download size={13} />
            Download
          </button>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-gray-light bg-white p-3 shadow-[0_2px_8px_rgba(15,41,64,0.03)]">
          <div className="min-w-0 sm:pr-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
              DOWNLOAD YOUR AGENT
            </h3>
            <p className="mt-0.5 text-xs leading-4 text-navy/60">
              Download the agent that you will need to install and run in your infrastructure. This agent contains a ZIP folder containing a binary as well as the documentation to install/uninstall this agent.
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert('Downloading CyberCheckAgent.zip...')}
            className="w-full sm:w-auto shrink-0 rounded-md border border-brand px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand/5 inline-flex items-center justify-center gap-1"
          >
            <Download size={13} />
            Download
          </button>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-gray-light bg-white p-3 shadow-[0_2px_8px_rgba(15,41,64,0.03)]">
          <div className="min-w-0 sm:pr-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
              DOWNLOAD LATER
            </h3>
            <p className="mt-0.5 text-xs leading-4 text-navy/60">
              You do not need these downloads right now unless you want to start running tests right away. You can always download these later from your CyberCheck 24/7 Dashboard.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto shrink-0 rounded-md border border-brand px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand/5 inline-flex items-center justify-center"
          >
            Download
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          type="button"
          onClick={() => navigate('/')}
          className="w-[120px]"
        >
          Continue
        </Button>
      </div>
    </section>
  )
}
