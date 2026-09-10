import type { ReactNode } from "react";
import { X } from "lucide-react";
import { buttonClass } from "./constants";

type Props = {
  title: string;
  children: ReactNode;
  confirmText: string;
  onConfirm: () => void;
  onClose: () => void;
  compact?: boolean;
};

export default function UserModal({
  title,
  children,
  confirmText,
  onConfirm,
  onClose,
  compact = false,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div
        className={`relative w-full ${compact ? "max-w-[360px]" : "max-w-[520px]"} rounded-sm bg-white p-7 shadow-[0_18px_45px_rgba(15,41,64,0.2)]`}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#9899bc] hover:text-navy"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">{title}</h2>
        {children}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onConfirm}
            className={`${buttonClass} min-w-[120px] bg-brand text-white`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-2 text-xs font-semibold text-[#8586a3]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
