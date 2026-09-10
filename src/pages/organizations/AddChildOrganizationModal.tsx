import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const products = ["Cyber Check 24/7", "Cyber X-Ray", "Cyber Phisher"];
const buttonClass =
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

type Props = {
  parentName: string;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function AddChildOrganizationModal({
  parentName,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(products);
  const toggleProduct = (product: string) =>
    setSelectedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product],
    );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 mx-auto backdrop-blur-sm">
      <div className="relative w-full max-w-[360px] rounded-xl bg-white p-3 sm:p-4 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-[#9899bc] hover:text-navy"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">Add Child Organization</h2>
        <p className="mt-1 text-[10px] text-navy/70">
          Create a child organization under {parentName}.
        </p>
        <label className="mt-2 block text-[10px] font-bold text-navy">
          Enter Organization Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Input"
            className="mt-1 block h-6 w-full rounded border border-[#e5e6ef] px-1.5 text-[10px] outline-none focus:border-brand"
          />
        </label>
        <label className="mt-2 block text-[10px] font-bold text-navy">
          Parent Organization
          <div className="relative mt-1">
            <select
              value={parentName}
              disabled
              className="h-6 w-full appearance-none rounded border border-[#e5e6ef] bg-[#fafaff] px-1.5 pr-6 text-[10px] text-navy outline-none"
            >
              <option>{parentName}</option>
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-1.5 top-1.5 text-[#9899bc]"
            />
          </div>
        </label>
        <label className="mt-2 block text-[10px] font-bold text-navy">
          Description (Optional)
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={250}
            className="mt-1 block h-12 w-full resize-none rounded border border-[#e5e6ef] p-1.5 text-[10px] outline-none focus:border-brand"
          />
          <span className="mt-0.5 block text-right text-[9px] font-normal text-[#9899bc]">
            {description.length}/250 characters remaining
          </span>
        </label>
        <p className="mt-2 text-[10px] font-bold text-navy">Select Products</p>
        <div className="mt-1 grid grid-cols-3 gap-1.5">
          {products.map((product) => (
            <label
              key={product}
              className="rounded-lg bg-[#fafaff] p-1.5 text-center text-[9px] font-semibold text-navy shadow-[0_4px_12px_rgba(15,41,64,0.04)]"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => toggleProduct(product)}
                className="float-right accent-brand"
              />
              <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#eff1ff] text-brand">
                ◉
              </span>
              {product}
            </label>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onSave(name.trim() || "ABC Inc. - San Diego")}
            className={`${buttonClass} bg-brand text-white`}
          >
            Save &amp; Add More
          </button>
          <button
            onClick={() => onSave(name.trim() || "ABC Inc. - San Diego")}
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