import { Check, CheckCircle2, MoreHorizontal, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../components/ui/Button'

type PanelState = 'closed' | 'detecting' | 'confirmed'
type ScanUrl = { id: number; url: string; verified: boolean }

const sampleUrls: ScanUrl[] = [
  { id: 1, url: 'https://www.hypertrends.com/welcome-to-cybercatch', verified: true },
  { id: 2, url: 'https://www.hypertrends.com/welcome-to-cybercatch', verified: false },
  { id: 3, url: 'https://www.hypertrends.com/welcome-to-cybercatch', verified: true },
  { id: 4, url: 'https://www.hypertrends.com/welcome-to-cybercatch', verified: true },
]

export default function ScanUrlsPage() {
  const [urls, setUrls] = useState<ScanUrl[]>([])
  const [panel, setPanel] = useState<PanelState>('closed')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()
  const canSave = url.trim().length > 0
  const domain = url.replace(/^https?:\/\//, '').split('/')[0] || 'your-domain.com'
  const openPanel = () => { setUrl(''); setPanel('detecting') }
  const saveUrl = () => { if (canSave) { setUrls((current) => [...current, { id: Date.now(), url, verified: true }]); setPanel('closed') } }
  const visibleUrls = urls.length ? [...urls, ...sampleUrls] : []

  return (
    <section className="relative min-h-[520px] py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h1 className="text-lg font-bold text-navy">Setup Scan URLs</h1><p className="mt-2 text-xs text-black">These are URLs that our system will scan for vulnerabilities on a period basis.</p></div>
        {urls.length > 0 && <Button onClick={openPanel} className="inline-flex items-center gap-1.5 text-xs"><Plus size={14} /> Add New URL</Button>}
      </div>

      {urls.length === 0 ? (
        <div className="mt-9 rounded-[18px] bg-white p-8 text-center shadow-[0_8px_30px_rgba(15,41,64,0.08)]">
          <h2 className="text-base font-bold text-black">No Scan URLs Setup</h2>
          <p className="mx-auto mt-4 max-w-[370px] text-xs leading-5 text-black">You have not set up any scan URLs. Click the “Add URLs” button below to start scanning.</p>
          <h3 className="mt-5 text-sm font-bold text-black">To finalize URL Setup</h3>
          <div className="mx-auto mt-4 max-w-[430px] space-y-3 text-left text-xs font-semibold text-black"><p className="flex items-center gap-3"><Check size={16} className="text-brand" />We will need confirmation that you own the domains we will scan.</p><p className="flex items-center gap-3"><Check size={16} className="text-brand" />You will need access to your DNS Host to confirm your domain.</p></div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5"><Button onClick={openPanel} className="px-8 text-xs">Add URLs</Button><Button variant="ghost" onClick={() => navigate('/cyber-xray/review')} className="text-xs">Skip for now, I’ll add later</Button></div>
        </div>
      ) : (
        <div className="mt-7"><div className="grid grid-cols-[28px_minmax(0,1fr)_88px_28px] gap-2 px-2 pb-2 text-[10px] font-semibold text-navy/45"><span><input type="checkbox" /></span><span>URL</span><span>Status</span><span /></div><div className="space-y-2">{visibleUrls.map((item) => <div key={item.id} className="grid grid-cols-[28px_minmax(0,1fr)_88px_28px] items-center gap-2 rounded-xl bg-white px-2 py-2.5 text-[10px] shadow-[0_3px_12px_rgba(15,41,64,0.05)]"><input type="checkbox" /><span className="truncate text-brand">{item.url}</span><span className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold ${item.verified ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>{item.verified ? 'Verified' : 'Unverified'}</span><button className="text-navy/45"><MoreHorizontal size={16} /></button></div>)}</div><div className="mt-5 flex justify-between text-[10px] text-navy/45"><span>Showing {visibleUrls.length} of {visibleUrls.length} links</span><span>First&nbsp; 1 &nbsp;|&nbsp; 2 &nbsp;|&nbsp; 3 &nbsp;|&nbsp; Last</span></div><Button onClick={() => navigate('/cyber-xray/review')} className="mt-6 w-[143px] text-xs">Continue</Button></div>
      )}

      {panel !== 'closed' && <div className="fixed inset-0 z-30 bg-navy/15"><aside className="absolute right-0 top-0 h-full w-full max-w-[480px] bg-white p-8 shadow-[-8px_0_30px_rgba(15,41,64,0.12)]"><button onClick={() => setPanel('closed')} className="absolute right-6 top-6 text-navy/45"><X size={18} /></button><h2 className="text-base font-bold text-black">Add URL to scan</h2><label className="mt-7 block text-[10px] font-bold text-black">Enter the URL to scan*<input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://www.example.com" className="mt-3 w-full rounded-md border border-gray-light px-3 py-2.5 text-xs text-navy outline-none placeholder:text-navy/30 focus:border-brand" /></label><div className="mt-7 rounded-2xl p-6 text-center shadow-[0_5px_22px_rgba(15,41,64,0.08)]">{canSave ? panel === 'detecting' ? <><h3 className="text-sm font-bold text-black">We detected a new domain</h3><p className="mt-3 text-xs leading-5 text-black">We detected a new domain “{domain}”.<br /><br />Let's make sure you own this domain before we scan it.</p><Button onClick={() => setPanel('confirmed')} className="mt-5 text-xs">I own this domain</Button></> : <><CheckCircle2 className="mx-auto text-brand" size={20} /><h3 className="mt-2 text-sm font-bold text-black">We added this domain to your list!</h3><p className="mt-4 text-xs leading-5 text-black">You will find this domain under “Domains”. We will list the verification criteria so you can confirm ownership.</p></> : <p className="text-xs leading-5 text-black">Enter a URL above to check the domain and add it to your scan list.</p>}</div><div className="absolute bottom-8 left-8 flex items-center gap-3"><button disabled={!canSave} onClick={() => { setUrl(''); setPanel('detecting') }} className={`rounded-md px-3 py-2 text-[10px] font-bold text-white ${canSave ? 'bg-brand' : 'cursor-not-allowed bg-gray-400'}`}>Save & Add More</button><button disabled={!canSave} onClick={saveUrl} className={`rounded-md px-3 py-2 text-[10px] font-bold ${canSave ? 'border border-brand text-brand' : 'cursor-not-allowed border border-gray-400 bg-gray-400 text-white'}`}>Save & Close</button><button onClick={() => setPanel('closed')} className="text-[10px] font-bold text-navy/45">Cancel</button></div></aside></div>}
    </section>
  )
}
