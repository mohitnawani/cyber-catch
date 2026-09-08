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
const buttonClass = 'inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30'

type Props = { onSave?: (form: OrganizationForm) => void }

export default function OrganizationGeneralPage({ onSave }: Props) {
  // Stores the inline organization details form.
  const [form, setForm] = useState(initialForm)
  // Controls the deactivate confirmation dialog.
  const [showDeactivate, setShowDeactivate] = useState(false)
  const update = <K extends keyof OrganizationForm>(key: K, value: OrganizationForm[K]) => setForm(current => ({ ...current, [key]: value }))
  const toggleProduct = (product: string) => update('products', form.products.includes(product) ? form.products.filter(item => item !== product) : [...form.products, product])

  return <div className="max-w-155"><p className="text-[10px] font-bold text-[#8586a3]">General data</p><div className="mt-2 grid grid-cols-2 gap-3"><Field label="Name" value={form.name} onChange={value => update('name', value)} /><Field label="Industry Type" value={form.industry} onChange={value => update('industry', value)} /></div><p className="mt-5 text-[10px] font-bold text-[#8586a3]">Billing Confirmation</p><div className="mt-2 space-y-3"><Field label="Billing Address" value={form.billingAddress} onChange={value => update('billingAddress', value)} /><div className="grid grid-cols-3 gap-3"><Field label="Billing Contact (Name)" value={form.billingContactName} onChange={value => update('billingContactName', value)} /><Field label="Billing Start Date" value={form.billingStartDate} onChange={value => update('billingStartDate', value)} /><Field label="Billing Contact (Phone)" value={form.billingContactPhone} onChange={value => update('billingContactPhone', value)} /></div><Field label="Billing Contact (Email)" value={form.billingContactEmail} onChange={value => update('billingContactEmail', value)} /></div><div className="mt-5 grid grid-cols-2 gap-8"><div><p className="text-[10px] font-bold text-[#8586a3]">Organization Logo</p><div className="mt-2 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">{form.logoName}</span><button className="text-[10px] font-semibold text-brand">click here to change</button></div></div><div><p className="text-[10px] font-bold text-[#8586a3]">Products</p><p className="mt-2 text-[10px] text-navy/70">Select the products to which you want to allow access:</p><div className="mt-2 flex flex-wrap gap-3">{products.map(product => <label key={product} className="flex items-center gap-1 text-[9px] text-navy"><input type="checkbox" checked={form.products.includes(product)} onChange={() => toggleProduct(product)} className="accent-brand" />{product}</label>)}</div></div></div><div className="mt-12 flex justify-between"><button onClick={() => setShowDeactivate(true)} className={`${buttonClass} bg-[#d90808] text-white`}>Deactivate</button><button onClick={() => onSave?.(form)} className={`${buttonClass} min-w-24 bg-brand text-white`}>Save</button></div>{showDeactivate && <OrganizationActionModal action="deactivate" onClose={() => setShowDeactivate(false)} onConfirm={() => setShowDeactivate(false)} />}</div>
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-[10px] font-bold text-navy">{label}<div className="relative mt-1"><input value={value} onChange={event => onChange(event.target.value)} className="h-8 w-full rounded border border-[#e5e6ef] bg-white px-2 text-[10px] font-normal text-navy outline-none focus:border-brand" />{label === 'Billing Start Date' && <CalendarDays size={13} className="pointer-events-none absolute right-2 top-2 text-[#9899bc]" />}</div></label> }
