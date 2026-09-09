import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const products = ["Cyber Check 24/7", "Cyber X-Ray", "Cyber Phisher"];
const buttonClass =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

type Props = {
  onClose: () => void;
  onSave: (name: string, industry: string) => void;
};

export default function AddOrganizationModal({ onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(products);
  const toggleProduct = (product: string) =>
    setSelectedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product],
    );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 mx-auto">
      <div className="relative w-full max-w-90 rounded-sm bg-white p-7 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-[#9899bc] hover:text-navy"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">Add an Organization</h2>
        <p className="mt-2 text-[10px] text-navy/70">
          Create an organization and assign its products.
        </p>
        <Field
          label="Enter Organization Name"
          value={name}
          onChange={setName}
        />
        <label className="mt-4 block text-[10px] font-bold text-navy">
          Parent Organization
          <div className="relative mt-1">
            <select
              value={parent}
              onChange={(event) => setParent(event.target.value)}
              className="h-8 w-full appearance-none rounded border border-[#e5e6ef] bg-white px-2 pr-7 text-[10px] outline-none"
            >
              <option value="">Select parent organization</option>
              <option>ABC Inc.</option>
              <option>Hyper Trends</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2 top-2 text-[#9899bc]"
            />
          </div>
        </label>
        <label className="mt-4 block text-[10px] font-bold text-navy">
          Description (Optional)
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={250}
            className="mt-1 block h-16 w-full resize-none rounded border border-[#e5e6ef] p-2 text-[10px] outline-none focus:border-brand"
          />
          <span className="mt-1 block text-right text-[9px] font-normal text-[#9899bc]">
            {description.length}/250 characters remaining
          </span>
        </label>
        <p className="mt-4 text-[10px] font-bold text-navy">Select Products</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {products.map((product) => (
            <label
              key={product}
              className="rounded-lg bg-[#fafaff] p-2 text-center text-[9px] font-semibold text-navy shadow-[0_4px_12px_rgba(15,41,64,0.04)]"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => toggleProduct(product)}
                className="float-right accent-brand"
              />
              <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#eff1ff] text-brand">
                ◉
              </span>
              {product}
            </label>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onSave(name.trim() || "ABC Inc.", "Industry name")}
            className={`${buttonClass} bg-brand text-white`}
          >
            Save &amp; Add More
          </button>
          <button
            onClick={() => onSave(name.trim() || "ABC Inc.", "Industry name")}
            className={`${buttonClass} border border-brand bg-white text-brand`}
          >
            Save &amp; Close
          </button>
          <button
            onClick={onClose}
            className="px-2 text-[10px] font-semibold text-[#8586a3]"
          >
            Cancel
          </button>
        </div>
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
    <label className="mt-4 block text-[10px] font-bold text-navy">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Input"
        className="mt-1 block h-8 w-full rounded border border-[#e5e6ef] px-2 text-[10px] outline-none focus:border-brand"
      />
    </label>
  );
}
