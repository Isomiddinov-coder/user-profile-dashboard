import { useState } from 'react';
import {
  AtSign,
  BriefcaseBusiness,
  Check,
  Edit3,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

export type UserProfile = {
  name: string;
  title: string;
  email: string;
  phone: string;
  active: boolean;
};

type UserCardProps = {
  profile: UserProfile;
  onEdit: () => void;
  onToggleStatus: () => void;
};

const AVATAR_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" y1="0" x2="1" y2="1"%3E%3Cstop stop-color="%23efc0a8"/%3E%3Cstop offset="1" stop-color="%2382a9a5"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="160" height="160" fill="url(%23g)"/%3E%3Ccircle cx="80" cy="66" r="29" fill="%231d2a38" fill-opacity=".87"/%3E%3Cpath d="M31 151c4-35 22-54 49-54s45 19 49 54" fill="%231d2a38" fill-opacity=".87"/%3E%3C/svg%3E';

export function UserCard({ profile, onEdit, onToggleStatus }: UserCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[#ded6c8] bg-[#fffdfa] shadow-[0_18px_55px_rgba(54,52,44,0.08)] transition-shadow hover:shadow-[0_22px_65px_rgba(54,52,44,0.12)]" data-testid="card-user-profile">
      <div className="h-2 bg-[#e8755d]" />
      <div className="p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 min-[430px]:flex-row min-[430px]:items-start">
          <div className="relative shrink-0">
            <div className="grid size-[92px] place-items-center overflow-hidden rounded-[24px] bg-[#d7e7df] text-2xl font-extrabold tracking-[-0.05em] text-[#23615e] ring-8 ring-[#f4eee4] sm:size-[112px]">
              {imageFailed ? (
                <span aria-label={`Avatar fallback for ${profile.name}`} data-testid="avatar-fallback">
                  {initials}
                </span>
              ) : (
                <img
                  alt={`${profile.name} avatar`}
                  className="size-full object-cover"
                  data-testid="img-profile-avatar"
                  onError={() => setImageFailed(true)}
                  src={AVATAR_IMAGE}
                />
              )}
            </div>
            <span
              aria-label={profile.active ? 'Active status' : 'Inactive status'}
              className={`absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border-4 border-[#fffdfa] ${profile.active ? 'bg-[#4b9d7d]' : 'bg-[#8d9390]'}`}
              data-testid="status-avatar-indicator"
            >
              {profile.active && <Check className="text-white" size={13} strokeWidth={3} />}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#e8755d]">Team member</p>
                <h2 className="break-words text-[clamp(1.7rem,4vw,2.35rem)] font-extrabold leading-[1.04] tracking-[-0.055em] text-[#1d2a38]" data-testid="text-profile-name">
                  {profile.name}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-[#596169]" data-testid="text-profile-title">
                  <BriefcaseBusiness className="text-[#e8755d]" size={15} strokeWidth={2} />
                  {profile.title}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold ${profile.active ? 'bg-[#e1f1e9] text-[#287156]' : 'bg-[#ecece8] text-[#6d736f]'}`}
                data-testid="status-profile"
              >
                <span className={`size-1.5 rounded-full ${profile.active ? 'bg-[#4b9d7d]' : 'bg-[#8d9390]'}`} />
                {profile.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-6 grid gap-3 border-t border-[#ece5da] pt-5 sm:grid-cols-2">
              <a
                className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-2 text-sm text-[#596169] transition-colors hover:bg-[#f6f1e9] hover:text-[#1d2a38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d]"
                data-testid="link-profile-email"
                href={`mailto:${profile.email}`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f7e8e2] text-[#c25743]">
                  <Mail size={15} strokeWidth={2} />
                </span>
                <span className="min-w-0 truncate" data-testid="text-profile-email">{profile.email}</span>
              </a>
              <a
                className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-2 text-sm text-[#596169] transition-colors hover:bg-[#f6f1e9] hover:text-[#1d2a38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d]"
                data-testid="link-profile-phone"
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e7f0ec] text-[#287156]">
                  <Phone size={15} strokeWidth={2} />
                </span>
                <span data-testid="text-profile-phone">{profile.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-[#ece5da] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-[#7b817c]">
            <ShieldCheck size={15} className="text-[#4b9d7d]" />
            <span>Changes are visible to customer-facing teams</span>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d8d0c3] bg-[#fffdfa] px-4 text-sm font-bold text-[#596169] transition-all hover:-translate-y-0.5 hover:border-[#b9afa0] hover:text-[#1d2a38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d] focus-visible:ring-offset-2 active:translate-y-0"
              data-testid="button-edit-profile"
              onClick={onEdit}
              type="button"
            >
              <Edit3 size={16} strokeWidth={2} />
              Edit profile
            </button>
            <button
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8755d] focus-visible:ring-offset-2 active:translate-y-0 ${profile.active ? 'bg-[#e7f0ec] text-[#287156] hover:bg-[#dcebe4]' : 'bg-[#1d2a38] text-[#fffdfa] hover:bg-[#2e4051]'}`}
              data-testid="button-toggle-status"
              onClick={onToggleStatus}
              type="button"
            >
              {profile.active ? <UserRound size={16} strokeWidth={2} /> : <AtSign size={16} strokeWidth={2} />}
              {profile.active ? 'Set inactive' : 'Set active'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}