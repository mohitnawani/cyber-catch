import { ClipboardCheck } from 'lucide-react'

export default function ReviewPage() {
  return (
    <section className="rounded-2xl border border-gray-light bg-white-pure p-6 shadow-[0_2px_12px_rgba(15,41,64,0.06)] sm:p-8">
      <ClipboardCheck className="text-brand" size={26} />
      <h1 className="mt-4 text-2xl font-bold text-navy">Review your Cyber X-Ray</h1>
      <p className="mt-2 text-sm text-navy/60">Confirm your scan schedule and selected URLs before starting the first scan.</p>
      <div className="mt-7 space-y-3 rounded-xl bg-[#F6F7F9] p-5 text-sm text-navy/70"><p><strong className="text-navy">Schedule:</strong> Weekly at 09:00</p><p><strong className="text-navy">URLs:</strong> No URLs added yet</p></div>
      <button className="mt-5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white">Start scan</button>
    </section>
  )
}
