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
      <div className="relative flex min-h-[380px] w-full max-w-[320px] flex-col rounded-xl bg-white p-5 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#9899bc] hover:text-navy"
        >
          <X size={15} />
        </button>
        <h2 className="text-lg font-bold text-black">
          {activating ? "Activate?" : "Deactivate?"}
        </h2>
        <p className="mt-4 text-xs leading-5 text-brand underline decoration-brand/40 underline-offset-2">
          Are you sure you want to {activating ? "activate" : "deactivate"} this product?
          Customers will{" "}
          {activating
            ? "now be able to use"
            : "no longer be able to run any new campaigns for"}{" "}
          this product.
        </p>
        <div className="mt-auto flex gap-2.5 pt-8">
          <button
            onClick={onConfirm}
            className={`${buttonClass} flex-1 py-2 ${activating ? "bg-brand text-white" : "border border-brand bg-white text-brand"}`}
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className={`${buttonClass} flex-1 py-2 ${activating ? "border border-brand bg-white text-brand" : "bg-brand text-white"}`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
