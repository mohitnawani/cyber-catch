import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../components/ui/Button'

const acknowledgements = [
  'I acknowledge that I own the URLs that Cyber X-Ray will scan',
  'I acknowledge that Cyber X-Ray will run scans at the schedule I have identified',
  'I authorize Cyber X-Ray to run scans at the intervals I have specified',
  'I understand that a scan may impact the performance of the system where the URLs are hosted',
]

export default function ReviewPage() {
  const [confirmed, setConfirmed] = useState<boolean[]>(Array(acknowledgements.length).fill(false))
  const navigate = useNavigate()
  const ready = confirmed.every(Boolean)

  const toggleAcknowledgement = (index: number) => {
    setConfirmed((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))
  }

  return (
    <section className="w-full max-w-[915px] pb-4 pt-6 overflow-x-hidden">
      <h1 className="font-montserrat text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight tracking-normal text-black">Review</h1>
      <div className="mt-3 rounded-2xl bg-white p-3 sm:p-4 shadow-[0_4px_18px_rgba(15,41,64,0.06)]">
        <div className="space-y-2 p-3 sm:p-5 lg:p-6">
          {acknowledgements.map((acknowledgement, index) => (
            <label key={acknowledgement} className="flex cursor-pointer items-start gap-2.5 sm:gap-3">
              <input
                type="checkbox"
                checked={confirmed[index]}
                onChange={() => toggleAcknowledgement(index)}
                className="mt-1 h-3.5 w-3.5 shrink-0 accent-brand"
              />
              <span className="font-ddin text-xs sm:text-sm font-bold leading-5 tracking-normal text-black">{acknowledgement}</span>
            </label>
          ))}
        </div>
      </div>
      <Button disabled={!ready} onClick={() => navigate('/')} className="mt-4 px-4">All Good, Go to Dashboard</Button>
    </section>
  )
}
