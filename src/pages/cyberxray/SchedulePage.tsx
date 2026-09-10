import { useState } from 'react'
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
const inputClass = 'mt-1.5 rounded-md border border-gray-light bg-white px-2.5 py-1.5 text-xs font-normal text-navy/65 outline-none focus:border-brand'
const helperTextClass = 'text-xs leading-4 text-black'

export default function SchedulePage() {
  const [interval, setInterval] = useState<Interval>('bi-weekly')
  const [day, setDay] = useState('Wed')
  const [monthDay, setMonthDay] = useState('23/08/2026')
  const [time, setTime] = useState('11:45')
  const navigate = useNavigate()
  const needsWeekday = interval === 'weekly' || interval === 'bi-weekly'

  return (
    <section className="max-w-[620px] pb-8 pt-6">

      <h1 className="text-lg font-bold tracking-tight text-navy lg:text-2xl">Select Your Test Schedule</h1>
      <p className="mt-3 text-xs leading-6 text-black font-ddin">Test will run on the interval and date/time you select.<br />Don't worry you can always change this later.</p>

      <div className="mt-4 w-full max-w-[380px] space-y-3">
        <label className={fieldLabelClass}>
          Select an Interval
          <select value={interval} onChange={(event) => setInterval(event.target.value as Interval)} className={`${inputClass} w-full`}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <p className="text-xs leading-4 text-black">{intervalCopy[interval]}</p>

        {needsWeekday && (
          <div>
            <p className={fieldLabelClass}>Select day of the week</p>
            <div className="mt-1.5 flex flex-wrap gap-1 sm:flex-nowrap sm:justify-between">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((weekDay) => (
                <button key={weekDay} type="button" onClick={() => setDay(weekDay)} className={`h-7 min-w-7 flex-1 rounded-md px-1.5 text-[11px] font-medium transition sm:flex-none ${day === weekDay ? 'bg-brand text-white' : 'text-navy/45 hover:bg-brand/5'}`}>{weekDay}</button>
              ))}
            </div>
            <p className={`mt-1.5 ${helperTextClass}`}>This is the day your test will run on.</p>
          </div>
        )}

        {interval === 'monthly' && (
          <label className={fieldLabelClass}>
            Select a date you'd like to run your test on
            <div className="relative mt-1.5">
              <input type="date" value={monthDay.split('/').reverse().join('-')} onChange={(event) => setMonthDay(event.target.value.split('-').reverse().join('/'))} className={`${inputClass} mt-0 w-full`} />
            </div>
            <p className={`mt-1.5 font-normal ${helperTextClass}`}>Tip: To allow for days of the month variations, avoid picking the last day of the month.</p>
          </label>
        )}

        <label className={fieldLabelClass}>
          Select time of the day
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className={`${inputClass} block w-full sm:w-auto`} />
        </label>
        <p className={helperTextClass}>Best to run tests when the impact to your sites is minimal.</p>

        <Button type="button" onClick={() => navigate('/cyber-xray/scan-urls')} className="w-[120px]">Continue</Button>
      </div>
    </section>
  )
}
