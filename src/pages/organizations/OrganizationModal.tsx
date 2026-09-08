import { CalendarDays, Upload, X } from "lucide-react";

export type OrganizationForm = {
  name: string;
  industry: string;
  billingAddress: string;
  billingStartDate: string;
  billingContactName: string;
  billingContactPhone: string;
  billingContactEmail: string;
  logoName: string;
  products: string[];
};

export const emptyOrganizationForm: OrganizationForm = {
  name: "",
  industry: "",
  billingAddress: "",
  billingStartDate: "2021-08-23",
  billingContactName: "",
  billingContactPhone: "",
  billingContactEmail: "",
  logoName: "",
  products: [],
};

const products = ["Cyber Check 24/7", "Cyber X-Ray", "Cyber Phisher"];
const buttonClass =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

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

export default function OrganizationModal({
  form,
  onChange,
  onToggleProduct,
  onClose,
  onSave,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative max-h-[90vh] w-full max-w-90 overflow-y-auto rounded-sm bg-white p-7 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-[#9899bc] hover:text-navy"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">Create an Organization</h2>
        <p className="mt-2 text-[10px] text-navy/70">
          Enter the data of the organization.
        </p>

        <p className="mt-4 text-[10px] font-bold text-[#8586a3]">
          General data
        </p>
        <div className="mt-2 grid grid-cols-2 gap-3">
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

        <p className="mt-4 text-[10px] font-bold text-[#8586a3]">
          Billing Confirmation
        </p>
        <div className="mt-2 space-y-3">
          <Field
            label="Billing Address"
            value={form.billingAddress}
            onChange={(value) => onChange("billingAddress", value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <DateField
              label="Billing Start Date"
              value={form.billingStartDate}
              onChange={(value) => onChange("billingStartDate", value)}
            />
            <span />
          </div>
          <div className="grid grid-cols-2 gap-3">
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
          </div>
          <Field
            label="Billing Contact (Email)"
            value={form.billingContactEmail}
            onChange={(value) => onChange("billingContactEmail", value)}
          />
        </div>

        <label className="mt-4 block text-[10px] font-bold text-[#8586a3]">
          Organization Logo
          <div className="relative mt-2 flex h-14 cursor-pointer items-center justify-center rounded border border-dashed border-[#c9cbe0] text-[9px] text-[#9899bc]">
            <Upload size={13} className="mr-2" />
            {form.logoName || "Drag and Drop logo here or click here to browse"}
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                onChange("logoName", event.target.files?.[0]?.name || "")
              }
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        </label>
        <p className="mt-4 text-[10px] font-bold text-[#8586a3]">Products</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {products.map((product) => (
            <label
              key={product}
              className="flex items-center gap-1 text-[9px] text-navy"
            >
              <input
                type="checkbox"
                checked={form.products.includes(product)}
                onChange={() => onToggleProduct(product)}
                className="accent-brand"
              />
              {product}
            </label>
          ))}
        </div>
        <button
          onClick={onSave}
          className={`${buttonClass} mt-5 min-w-24 bg-brand text-white`}
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
        className="mt-1 block h-8 w-full rounded border border-[#e5e6ef] px-2 text-[10px] font-normal outline-none focus:border-brand"
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
          className="h-8 w-full rounded border border-[#e5e6ef] bg-white px-2 pr-7 text-[10px] font-normal text-navy outline-none focus:border-brand"
        />
        <CalendarDays
          size={13}
          className="pointer-events-none absolute right-2 top-2 text-[#9899bc]"
        />
      </div>
    </label>
  );
}
