import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router'
import Button from '../../components/ui/Button'

type Interval = 'daily' | 'weekly' | 'bi-weekly' | 'monthly'

const intervalCopy: Record<Interval, string> = {
  daily: 'We will run your test daily at the time of your choice.',
  weekly: 'We will run your test every week on the day specified.',
  'bi-weekly': 'We will run your test every alternate week on the day specified.',
  monthly: 'We will run your test on the specified day of the month.',
}

const fieldLabelClass = 'block text-xs font-bold text-navy'
const inputClass = 'mt-3 rounded-md border border-gray-light bg-white px-3 py-2.5 text-sm font-normal text-navy/65 outline-none focus:border-brand'
const helperTextClass = 'text-xs leading-5 text-black'

export default function SchedulePage() {
  const [interval, setInterval] = useState<Interval>('bi-weekly')
  const [day, setDay] = useState('Wed')
  const [monthDay, setMonthDay] = useState('23/08/2026')
  const [time, setTime] = useState('11:45')
  const navigate = useNavigate()
  const needsWeekday = interval === 'weekly' || interval === 'bi-weekly'

  return (
    <section className="max-w-[620px] py-8 mx-auto">
      <div className="flex h-11 w-11 items-center justify-center rounded-full text-[#604BFF]">
        <CalendarDays size={29} strokeWidth={2} />
      </div>
      <h1 className="mt-5 text-lg font-bold tracking-tight text-navy">Select Your Test Schedule</h1>
      <p className="mt-3 text-xs leading-6 text-black font-ddin">Test will run on the interval and date/time you select.<br />Don't worry you can always change this later.</p>

      <div className="mt-7 max-w-[380px] space-y-6">
        <label className={fieldLabelClass}>
          Select an Interval
          <select value={interval} onChange={(event) => setInterval(event.target.value as Interval)} className={`${inputClass} w-full`}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <p className=" mt-2 text-xs leading-5 text-black">{intervalCopy[interval]}</p>

        {needsWeekday && (
          <div>
            <p className={fieldLabelClass}>Select day of the week</p>
            <div className="mt-3 flex justify-between gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((weekDay) => (
                <button key={weekDay} type="button" onClick={() => setDay(weekDay)} className={`h-8 min-w-8 rounded-md px-2 text-xs font-medium ${day === weekDay ? 'bg-brand text-white' : 'text-navy/45 hover:bg-brand/5'}`}>{weekDay}</button>
              ))}
            </div>
            <p className={`mt-3 ${helperTextClass}`}>This is the day your test will run on.</p>
          </div>
        )}

        {interval === 'monthly' && (
          <label className={fieldLabelClass}>
            Select a date you'd like to run your test on
            <div className="relative mt-3">
              <input type="date" value={monthDay.split('/').reverse().join('-')} onChange={(event) => setMonthDay(event.target.value.split('-').reverse().join('/'))} className={`${inputClass} mt-0 w-full`} />
            </div>
            <p className={`mt-3 font-normal ${helperTextClass}`}>Tip: To allow for days of the month variations, avoid picking the last day of the month.</p>
          </label>
        )}

        <label className={fieldLabelClass}>
          Select time of the day
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className={`${inputClass} block`} />
        </label>
        <p className={`-mt-2 ${helperTextClass}`}>Best to run tests when the impact to your sites is minimal.</p>

        <Button type="button" onClick={() => navigate('/cyber-xray/scan-urls')} className="w-[143px] text-xs">Continue</Button>
      </div>
    </section>
  )
}
