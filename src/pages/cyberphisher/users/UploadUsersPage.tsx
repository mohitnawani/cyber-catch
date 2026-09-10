import { useRef } from "react";
import type { ChangeEvent } from "react";
import { Download, Upload } from "lucide-react";
import { buttonClass } from "./constants";

type Props = {
  fileName: string;
  onFileSelected: (name: string) => void;
  onCancel: () => void;
  onImport: () => void;
};

export default function UploadUsersPage({
  fileName,
  onFileSelected,
  onCancel,
  onImport,
}: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  console.log("file_input", fileInput.current)
  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("myfile", event.target.files);
    
    if (file) onFileSelected(file.name);
  };
  const openPicker = () => fileInput.current?.click();

  return (
    <section className="max-w-[920px] pt-1 mx-auto">
      <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black">
        Import Using Excel
      </h2>
      <p className="mt-0.5 max-w-md text-xs leading-5 text-navy/70">
        Upload members from your Organization using a pre-configured Excel
        Format.
      </p>

      <div className="mt-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_6px_20px_rgba(15,41,64,0.07)]">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-black">
            Want To Know The Excel Format for Import
          </h3>
          <p className="mt-0.5 text-[10px] text-navy/65">
            You can download the format that can be easily saved as a worksheet
            on your device. You can download this sample file here.
          </p>
        </div>
        <button
          className={`${buttonClass} min-w-[115px] bg-brand text-white hover:bg-brand/90`}
        >
          <Download size={12} className="mr-2" />
          Import
        </button>
      </div>

      <h3 className="mt-2 text-base font-bold text-black">Import Members</h3>
      <div
        onClick={openPicker}
        className="mt-1 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-[#d8d9ea] bg-white/35 px-3 py-2 text-center transition hover:border-brand/50 hover:bg-white/60"
      >
        <input
          ref={fileInput}
          onChange={chooseFile}
          accept=".csv,.xlsx,.xls"
          type="file"
          className="hidden"
        />
        <Upload size={18} className="mb-1.5 text-brand" />
        <h4 className="text-sm font-bold text-black">
          {fileName || "Drag & Drop The Excel File Here"}
        </h4>
        <p className="mt-1 text-[10px] text-navy/65">
          Once you are ready with your CSV file, drag it anywhere in this area.
          Or click on the button to select the file
        </p>
        <button
          onClick={(event) => {
            event.stopPropagation();
            openPicker();
          }}
          className={`${buttonClass} mt-2 bg-brand px-4 text-[10px] text-white`}
        >
          Upload Member Excel
        </button>
        <p className="mt-1.5 text-[9px] text-navy/60">
          Please, make sure your file is saved with .CSV extension which allows
          Comma-separated Values to be imported
        </p>
      </div>
      <div className="mt-2 flex justify-end gap-1.5">
        <button
          onClick={onCancel}
          className={`${buttonClass} border border-navy/15 bg-white text-navy`}
        >
          Cancel
        </button>
        <button
          onClick={onImport}
          className={`${buttonClass} bg-brand text-white disabled:opacity-50`}
          disabled={!fileName}
        >
          Import Members
        </button>
      </div>
    </section>
  );
}
