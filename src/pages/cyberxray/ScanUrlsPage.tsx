import { ScanSearch } from 'lucide-react'

export default function ScanUrlsPage() {
  return (
    <section className="rounded-2xl border border-gray-light bg-white-pure p-6 shadow-[0_2px_12px_rgba(15,41,64,0.06)] sm:p-8">
      <ScanSearch className="text-brand" size={26} />
      <h1 className="mt-4 text-2xl font-bold text-navy">Add URLs to scan</h1>
      <p className="mt-2 text-sm text-navy/60">Enter a public domain or URL for Cyber X-Ray to assess.</p>
      <label className="mt-7 block text-sm font-medium text-navy">Domain or URL<input type="url" placeholder="https://example.com" className="mt-2 w-full rounded-xl border border-gray-light px-3 py-3 text-sm outline-none placeholder:text-navy/30 focus:border-brand" /></label>
      <button className="mt-4 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white">Add URL</button>
    </section>
  )
}
