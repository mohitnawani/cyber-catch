import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import type { OrganizationForm } from './OrganizationModal'
import OrganizationActionModal from './OrganizationActionModal'

const initialForm: OrganizationForm = {
  name: 'Hyper Trends',
  industry: 'Digital Solutions',
  billingAddress: '45 Phoenix Avenue',
  billingStartDate: '2021-08-23',
  billingContactName: 'Ralph Edwards',
  billingContactPhone: '+44734028383',
  billingContactEmail: 'edwards@example.com',
  logoName: 'dyson',
  products: ['Cyber Check 24/7', 'Cyber X-Ray', 'Cyber Phisher'],
}
const products = ['Cyber Check 24/7', 'Cyber X-Ray', 'Cyber Phisher']
const buttonClass = 'inline-flex items-center justify-center rounded-md px-6 py-2 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30'

type Props = { onSave?: (form: OrganizationForm) => void }

export default function OrganizationGeneralPage({ onSave }: Props) {
  const [form, setForm] = useState(initialForm)
  const [showDeactivate, setShowDeactivate] = useState(false)
  const update = <K extends keyof OrganizationForm>(key: K, value: OrganizationForm[K]) => setForm(current => ({ ...current, [key]: value }))
  const toggleProduct = (product: string) => update('products', form.products.includes(product) ? form.products.filter(item => item !== product) : [...form.products, product])

  return (
    <div className="w-full max-w-[680px]">
      <p className="text-xs font-bold text-brand">General data</p>
      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Field label="Name" value={form.name} onChange={value => update('name', value)} />
        <Field label="Industry Type" value={form.industry} onChange={value => update('industry', value)} />
      </div>

      <p className="mt-2 text-xs font-bold text-brand">Billing Confirmation</p>
      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Field label="Billing Address" value={form.billingAddress} onChange={value => update('billingAddress', value)} />
        <Field label="Billing Start Date" value={form.billingStartDate} onChange={value => update('billingStartDate', value)} isDate />
      </div>
      <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Field label="Billing Contact (Name)" value={form.billingContactName} onChange={value => update('billingContactName', value)} />
        <Field label="Billing Contact (Phone)" value={form.billingContactPhone} onChange={value => update('billingContactPhone', value)} />
        <Field label="Billing Contact (Email)" value={form.billingContactEmail} onChange={value => update('billingContactEmail', value)} />
      </div>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold text-brand">Organization Logo</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-bold lowercase text-white">{form.logoName}</span>
            <button className="text-[10px] text-navy/50"><span className="font-semibold text-brand hover:underline">click here</span> to change</button>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-brand">Products</p>
          <p className="mt-1 text-[10px] leading-4 text-navy/70">Select the products to which you want to allow access:</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {products.map(product => (
              <label key={product} className="flex items-center gap-1.5 text-[10px] text-navy">
                <input type="checkbox" checked={form.products.includes(product)} onChange={() => toggleProduct(product)} className="h-3.5 w-3.5 rounded accent-brand" />{product}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button onClick={() => setShowDeactivate(true)} className={`${buttonClass} bg-[#c81e1e] text-white`}>Deactivate</button>
        <button onClick={() => onSave?.(form)} className={`${buttonClass} min-w-[160px] bg-brand text-white`}>Save</button>
      </div>
      {showDeactivate && <OrganizationActionModal action="deactivate" onClose={() => setShowDeactivate(false)} onConfirm={() => setShowDeactivate(false)} />}
    </div>
  )
}

function Field({ label, value, onChange, isDate = false }: { label: string; value: string; onChange: (value: string) => void; isDate?: boolean }) {
  return (
    <label className="block text-[10px] font-bold text-navy">
      {label}
      <div className="relative mt-1">
        <input
          type={isDate || label === 'Billing Start Date' ? 'date' : 'text'}
          value={value}
          onChange={event => onChange(event.target.value)}
          className="h-6 w-full rounded border border-[#e5e6ef] bg-white px-1.5 pr-6 text-[10px] font-normal text-navy outline-none focus:border-brand"
        />
        {(isDate || label === 'Billing Start Date') && <CalendarDays size={12} className="pointer-events-none absolute right-1.5 top-1.5 text-[#9899bc]" />}
      </div>
    </label>
  )
}