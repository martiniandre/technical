import { Outlet } from 'react-router-dom';
import { DEFAULT_APP_NAME } from '../../shared/constants';
import { Card } from '@/shared/components/ui/card';

const appName = import.meta.env.VITE_APP_NAME || DEFAULT_APP_NAME;

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-theme-1">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-theme-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-theme-dynamic/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-theme-primary to-theme-dynamic shadow-lg shadow-theme-primary/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white text-capitalize">{appName}</h1>
          <p className="mt-1 text-sm text-white/70">Intelligent management platform</p>
        </div>

        <Card className="p-8 shadow-2xl backdrop-blur-xl border-none">
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
