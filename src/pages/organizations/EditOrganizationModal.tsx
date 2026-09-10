import { CalendarDays, X } from "lucide-react";
import type { OrganizationForm } from "./OrganizationModal";

const products = ["Cyber Check 24/7", "Cyber X-Ray", "Cyber Phisher"];
const buttonClass =
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

type Props = {
  form: OrganizationForm;
  onChange: <K extends keyof OrganizationForm>(
    key: K,
    value: OrganizationForm[K],
  ) => void;
  onToggleProduct: (product: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function EditOrganizationModal({
  form,
  onChange,
  onToggleProduct,
  onClose,
  onSave,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-xl bg-white p-3 sm:p-4 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-[#9899bc] hover:text-navy"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">Edit Organization</h2>
        <p className="mt-1 text-[10px] text-navy/70">
          Enter the data of the organization.
        </p>
        <p className="mt-2 text-[10px] font-bold text-[#8586a3]">
          General data
        </p>
        <div className="mt-0.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <Field
            label="Name"
            value={form.name}
            onChange={(value) => onChange("name", value)}
          />
          <Field
            label="Industry Type"
            value={form.industry}
            onChange={(value) => onChange("industry", value)}
          />
        </div>
        <p className="mt-2 text-[10px] font-bold text-[#8586a3]">
          Billing Confirmation
        </p>
        <div className="mt-0.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <Field
            label="Billing Address"
            value={form.billingAddress}
            onChange={(value) => onChange("billingAddress", value)}
          />
          <DateField
            label="Billing Start Date"
            value={form.billingStartDate}
            onChange={(value) => onChange("billingStartDate", value)}
          />
          <Field
            label="Billing Contact (Name)"
            value={form.billingContactName}
            onChange={(value) => onChange("billingContactName", value)}
          />
          <Field
            label="Billing Contact (Phone)"
            value={form.billingContactPhone}
            onChange={(value) => onChange("billingContactPhone", value)}
          />
          <Field
            label="Billing Contact (Email)"
            value={form.billingContactEmail}
            onChange={(value) => onChange("billingContactEmail", value)}
          />
        </div>
        <p className="mt-2 text-[10px] font-bold text-[#8586a3]">
          Organization Logo
        </p>
        <div className="mt-1 flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-bold lowercase text-white">
            {form.logoName || "dyson"}
          </span>
          <label className="cursor-pointer text-[10px] text-navy/50">
            <span className="font-semibold text-brand hover:underline">click here</span> to change
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                onChange("logoName", event.target.files?.[0]?.name || "")
              }
              className="hidden"
            />
          </label>
        </div>
        <p className="mt-2 text-[10px] font-bold text-[#8586a3]">Products</p>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
          {products.map((product) => (
            <label
              key={product}
              className="flex items-center gap-1.5 text-[10px] text-navy"
            >
              <input
                type="checkbox"
                checked={form.products.includes(product)}
                onChange={() => onToggleProduct(product)}
                className="h-3.5 w-3.5 rounded accent-brand"
              />
              {product}
            </label>
          ))}
        </div>
        <button
          onClick={onSave}
          className={`${buttonClass} mt-3 w-full sm:w-[200px] bg-brand py-1.5 text-white`}
        >
          Save
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-[10px] font-bold text-navy">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Input"
        className="mt-1 block h-6 w-full rounded border border-[#e5e6ef] px-1.5 text-[10px] font-normal outline-none focus:border-brand"
      />
    </label>
  );
}
function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-[10px] font-bold text-navy">
      {label}
      <div className="relative mt-1">
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-6 w-full rounded border border-[#e5e6ef] bg-white px-1.5 pr-6 text-[10px] font-normal text-navy outline-none focus:border-brand"
        />
        <CalendarDays
          size={12}
          className="pointer-events-none absolute right-1.5 top-1.5 text-[#9899bc]"
        />
      </div>
    </label>
  );
}