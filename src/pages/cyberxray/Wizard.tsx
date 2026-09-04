import { useState } from 'react'
import Button from '../../components/ui/Button'

const steps = ['Welcome','Schedule','Scan URLs','Verify Domain','Disclaimers','Success']

export default function Wizard() {
  const [step, setStep] = useState(0)
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Cyber X-Ray Onboarding</h2>
      <div className="text-sm opacity-70">Step {step+1} of {steps.length}: {steps[step]}</div>
      <div className="border rounded-lg p-6 min-h-[240px]">
        Placeholder for {steps[step]} content
      </div>
      <div className="flex justify-between">
        <Button variant="ghost" disabled={step===0} onClick={()=>setStep(s=>s-1)}>Back</Button>
        <Button onClick={()=>setStep(s=>Math.min(s+1,steps.length-1))}>Continue</Button>
      </div>
    </div>
  )
}
