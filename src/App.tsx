import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Modal } from '@/components/Modal';
import { UserCard, type UserProfile } from '@/components/UserCard';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Activity, ArrowUpRight, Clock3, LockKeyhole, UsersRound } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Maya Chen',
    title: 'Customer Success Lead',
    email: 'maya.chen@northstar.co',
    phone: '+1 (415) 555-0186',
    active: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="app-shell min-h-[100dvh] w-full overflow-hidden bg-[#f6f1e9] text-[#1d2a38]">
      <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-[#1d2a38] text-[#f6f1e9] shadow-[0_5px_12px_rgba(29,42,56,0.18)]" data-testid="brand-mark">
            <Activity size={18} strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-sm font-extrabold tracking-[-0.03em]">Northstar</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.19em] text-[#7b817c]">People ops</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs font-bold text-[#7b817c] sm:flex" data-testid="text-header-context">
          <span className="size-1.5 rounded-full bg-[#4b9d7d]" />
          Directory synced just now
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12 lg:px-12 lg:pt-16">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#e8755d]">
            <span className="h-px w-7 bg-[#e8755d]" />
            Team directory / profile
          </p>
          <h1 className="max-w-[650px] text-[clamp(2.7rem,7vw,5.3rem)] font-extrabold leading-[0.96] tracking-[-0.075em] text-[#1d2a38]" data-testid="heading-dashboard">
            Know who&apos;s on the other side.
          </h1>
          <p className="mt-5 max-w-[480px] text-[15px] leading-7 text-[#69716e] sm:text-base">
            A quick, dependable view of the people your customers meet every day. Keep the essentials accurate, without leaving the conversation.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          <UserCard
            onEdit={() => setIsModalOpen(true)}
            onToggleStatus={() => setProfile((current) => ({ ...current, active: !current.active }))}
            profile={profile}
          />

          <aside className="rounded-[24px] border border-[#ded6c8] bg-[#eee7dc] p-5 sm:p-6" data-testid="panel-profile-context">
            <div className="mb-7 flex items-center justify-between">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#7b817c]">At a glance</p>
              <ArrowUpRight className="text-[#e8755d]" size={17} strokeWidth={2} />
            </div>
            <div className="space-y-5">
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#dcebe4] text-[#287156]">
                  <UsersRound size={15} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xs text-[#7b817c]">Team</p>
                  <p className="mt-0.5 text-sm font-extrabold text-[#1d2a38]" data-testid="text-team-value">Customer experience</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f7e8e2] text-[#c25743]">
                  <Clock3 size={15} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xs text-[#7b817c]">Local time</p>
                  <p className="mt-0.5 text-sm font-extrabold text-[#1d2a38]" data-testid="text-time-value">09:42 · San Francisco</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e3e8ef] text-[#44596d]">
                  <LockKeyhole size={15} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xs text-[#7b817c]">Access level</p>
                  <p className="mt-0.5 text-sm font-extrabold text-[#1d2a38]" data-testid="text-access-value">Standard member</p>
                </div>
              </div>
            </div>
            <div className="mt-7 border-t border-[#d9d0c2] pt-5">
              <p className="text-xs leading-5 text-[#69716e]">
                Status changes are reflected in customer-facing tools within a few moments.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-14 flex flex-col gap-2 border-t border-[#ded6c8] pt-5 text-xs text-[#858a85] sm:flex-row sm:items-center sm:justify-between">
          <span>Internal directory · Northstar workspace</span>
          <span className="font-mono uppercase tracking-[0.12em]">Profile record / 01</span>
        </footer>
      </div>

      <Modal
        name={profile.name}
        onClose={() => setIsModalOpen(false)}
        onSave={(values) => {
          setProfile((current) => ({ ...current, ...values }));
          setIsModalOpen(false);
        }}
        open={isModalOpen}
        title={profile.title}
      />
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
