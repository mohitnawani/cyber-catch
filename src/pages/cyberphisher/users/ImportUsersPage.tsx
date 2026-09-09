import { FileSpreadsheet } from "lucide-react";
import { buttonClass } from "./constants";

type Props = { onImport: () => void };

export default function ImportUsersPage({ onImport }: Props) {
  return (
    <section className="max-w-[920px] pt-1 mx-auto">
      <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black">
        Import Users
      </h2>
      <p className="mt-1 max-w-md text-xs leading-5 text-navy/70">
        You will be able to import users down your organization using the
        following option
      </p>
      <div className="mt-6 flex items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-[0_6px_20px_rgba(15,41,64,0.07)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e6f6ed] text-[#0b9c53]">
          <FileSpreadsheet size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-black">Import Using Excel</h3>
          <p className="mt-0.5 text-[10px] text-navy/65">
            Use this option if you have an Excel that you can use for import
          </p>
        </div>
        <button
          onClick={onImport}
          className={`${buttonClass} min-w-[115px] bg-brand text-white hover:bg-brand/90`}
        >
          Import
        </button>
      </div>
    </section>
  );
}
