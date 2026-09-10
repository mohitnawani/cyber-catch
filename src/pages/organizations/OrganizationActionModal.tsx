import { X } from "lucide-react";

const buttonClass =
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

type Props = {
  action: "activate" | "deactivate";
  onClose: () => void;
  onConfirm: () => void;
};

export default function OrganizationActionModal({
  action,
  onClose,
  onConfirm,
}: Props) {
  const activating = action === "activate";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative flex min-h-[160px] w-full max-w-[360px] flex-col rounded-xl bg-white p-4 sm:p-5 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-[#9899bc] hover:text-navy"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">
          {activating ? "Activate?" : "Deactivate?"}
        </h2>
        <p className="mt-5 max-w-[240px] text-sm leading-5 text-navy/80">
          Are you sure you want to {activating ? "activate" : "deactivate"} this
          product?
        </p>
        <p className="max-w-[240px] text-sm leading-5 text-navy/80">
          Customers will{" "}
          {activating
            ? "now be able to use"
            : "no longer be able to run any new campaigns for"}{" "}
          this product.
        </p>
        <div className="mt-auto flex gap-3">
          <button
            onClick={onConfirm}
            className={`${buttonClass} flex-1 ${activating ? "bg-brand text-white" : "border border-brand bg-white text-brand"}`}
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className={`${buttonClass} flex-1 ${activating ? "border border-brand bg-white text-brand" : "bg-brand text-white"}`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
