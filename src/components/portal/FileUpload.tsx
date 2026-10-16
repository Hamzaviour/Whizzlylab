"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, UploadCloud, X } from "lucide-react";
import { btnPrimary, fmtBytes } from "./ui";

const MAX_BYTES = 4 * 1024 * 1024;
export const UPLOAD_ACCEPT =
  ".png,.jpg,.jpeg,.webp,.gif,.svg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.md,.zip";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={disabled || pending} className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-50`}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
      {pending ? "Uploading…" : "Upload"}
    </button>
  );
}

/** Drag-and-drop upload form. Size and type are re-checked by the server action. */
export function FileUploadForm({
  action,
  projectId,
  staff,
}: {
  action: (fd: FormData) => Promise<void>;
  projectId: string;
  staff: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const total = files.reduce((n, f) => n + f.size, 0);
  const tooBig = total > MAX_BYTES;

  const sync = (list: FileList | null) => setFiles(list ? Array.from(list) : []);
  const remove = (i: number) => {
    const dt = new DataTransfer();
    files.forEach((f, j) => j !== i && dt.items.add(f));
    if (input.current) input.current.files = dt.files;
    sync(dt.files);
  };

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="project_id" value={projectId} />
      <input type="hidden" name="tab" value="files" />
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (input.current && e.dataTransfer.files.length) {
            input.current.files = e.dataTransfer.files;
            sync(e.dataTransfer.files);
          }
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
          drag ? "border-[#066bf5] bg-[#066bf5]/5" : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
        }`}
      >
        <UploadCloud className="h-7 w-7 text-[#066bf5]" />
        <span className="text-sm font-semibold text-slate-800">Drop files here or click to browse</span>
        <span className="text-xs text-slate-500">Images, PDF, Office docs, text or zip · up to 4 MB per upload</span>
        <input
          ref={input}
          type="file"
          name="files"
          multiple
          accept={UPLOAD_ACCEPT}
          className="sr-only"
          onChange={(e) => sync(e.currentTarget.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 px-3 py-2 text-sm">
              <span className="min-w-0 flex-1 truncate text-slate-800">{f.name}</span>
              <span className="shrink-0 text-xs text-slate-500">{fmtBytes(f.size)}</span>
              <button type="button" onClick={() => remove(i)} aria-label={`Remove ${f.name}`} className="cursor-pointer text-slate-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {staff ? (
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="client_visible" defaultChecked /> Visible to the client
          </label>
        ) : (
          <span className="text-xs text-slate-500">Files you upload are shared with the team.</span>
        )}
        <div className="flex items-center gap-3">
          {tooBig && <span className="text-xs font-medium text-red-600">{fmtBytes(total)} selected, limit is 4 MB</span>}
          <SubmitButton disabled={files.length === 0 || tooBig} />
        </div>
      </div>
    </form>
  );
}
