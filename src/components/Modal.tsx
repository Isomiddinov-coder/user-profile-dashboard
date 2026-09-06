import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  name: string;
  title: string;
  onClose: () => void;
  onSave: (values: { name: string; title: string }) => void;
};

export function Modal({ open, name, title, onClose, onSave }: ModalProps) {
  const [draftName, setDraftName] = useState(name);
  const [draftTitle, setDraftTitle] = useState(title);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setDraftName(name);
    setDraftTitle(title);
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 40);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [name, onClose, open, title]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6"
      role="presentation"
      data-testid="modal-backdrop"
    >
      <button
        aria-label="Close edit profile modal"
        className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-[3px]"
        data-testid="button-close-modal-backdrop"
        onClick={onClose}
        type="button"
      />
      <section
        aria-describedby="edit-profile-description"
        aria-labelledby="edit-profile-heading"
        aria-modal="true"
        className="modal-enter relative z-10 w-full max-w-[460px] overflow-hidden rounded-[24px] border border-[#dfd7c8] bg-[#fffdfa] shadow-[0_30px_90px_rgba(17,31,45,0.24)]"
        role="dialog"
        data-testid="modal-edit-profile"
      >
        <div className="flex items-start justify-between border-b border-[#e8e0d3] bg-[#f4eee4] px-6 py-5 sm:px-7">
          <div>
            <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#e8755d]">
              Profile details
            </p>
            <h2 className="font-sans text-xl font-extrabold tracking-[-0.04em] text-[#1d2a38]" id="edit-profile-heading">
              Edit profile
            </h2>
            <p className="mt-1 text-sm text-[#6f746f]" id="edit-profile-description">
              Keep the directory record current.
            </p>
          </div>
          <button
            aria-label="Close edit profile modal"
            className="rounded-full p-2 text-[#6f746f] transition-colors hover:bg-[#e8e0d3] hover:text-[#1d2a38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d] focus-visible:ring-offset-2"
            data-testid="button-close-modal"
            onClick={onClose}
            type="button"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <form
          className="space-y-5 px-6 py-6 sm:px-7 sm:py-7"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draftName.trim() || !draftTitle.trim()) return;
            onSave({ name: draftName.trim(), title: draftTitle.trim() });
          }}
        >
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#596169]" htmlFor="profile-name">
              Full name
            </label>
            <input
              ref={nameInputRef}
              aria-label="Full name"
              className="h-12 w-full rounded-xl border border-[#d8d0c3] bg-[#fffdfa] px-4 text-[15px] font-semibold text-[#1d2a38] outline-none transition-shadow placeholder:text-[#9b9b93] focus:border-[#e8755d] focus:ring-4 focus:ring-[#e8755d]/15"
              data-testid="input-profile-name"
              id="profile-name"
              onChange={(event) => setDraftName(event.target.value)}
              placeholder="Enter a full name"
              required
              value={draftName}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#596169]" htmlFor="profile-title">
              Role / title
            </label>
            <input
              aria-label="Role or title"
              className="h-12 w-full rounded-xl border border-[#d8d0c3] bg-[#fffdfa] px-4 text-[15px] font-semibold text-[#1d2a38] outline-none transition-shadow placeholder:text-[#9b9b93] focus:border-[#e8755d] focus:ring-4 focus:ring-[#e8755d]/15"
              data-testid="input-profile-title"
              id="profile-title"
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="Enter a role or title"
              required
              value={draftTitle}
            />
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-[#e8e0d3] pt-5 sm:flex-row sm:justify-end">
            <button
              className="h-11 rounded-xl px-4 text-sm font-bold text-[#596169] transition-colors hover:bg-[#f2ede5] hover:text-[#1d2a38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d] focus-visible:ring-offset-2"
              data-testid="button-cancel-edit"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#e8755d] px-5 text-sm font-extrabold text-[#1d2a38] shadow-[0_6px_14px_rgba(232,117,93,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#ee8069] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d] focus-visible:ring-offset-2 active:translate-y-0"
              data-testid="button-save-profile"
              type="submit"
            >
              <Check size={16} strokeWidth={2.4} />
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}