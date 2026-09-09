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
    <section className="max-w-[915px] py-8 mx-auto">
      <h1 className="font-montserrat text-[34px] font-bold leading-[34px] tracking-normal text-black">Review</h1>
      <div className="mt-5 rounded-2xl bg-white p-3 shadow-[0_4px_18px_rgba(15,41,64,0.06)]">
        <div className="space-y-4 p-[50px]">
          {acknowledgements.map((acknowledgement, index) => (
            <label key={acknowledgement} className="flex cursor-pointer items-start gap-8">
              <input
                type="checkbox"
                checked={confirmed[index]}
                onChange={() => toggleAcknowledgement(index)}
                className="mt-[7px] h-4 w-4 accent-brand"
              />
              <span className="font-ddin  font-bold tracking-normal text-black">{acknowledgement}</span>
            </label>
          ))}
        </div>
      </div>
      <Button disabled={!ready} onClick={() => navigate('/')} className="mt-7 px-5 py-3 text-lg">All Good, Go to Dashboard</Button>
    </section>
  )
}
