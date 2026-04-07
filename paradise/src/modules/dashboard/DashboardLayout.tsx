import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { Sidebar } from './components/Sidebar';
import { DEFAULT_APP_NAME } from '@/shared/constants';

const appName = import.meta.env.VITE_APP_NAME || DEFAULT_APP_NAME;

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-theme-1">
        <Sidebar aria-label="Main Navigation" />
        <SidebarInset className="flex-1 overflow-y-auto bg-transparent">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 bg-theme-comp-1 px-6 border-b border-theme-comp-5 shadow-sm md:hidden">
            <SidebarTrigger className="h-9 w-9 rounded-xl bg-theme-primary text-white shadow-lg shadow-theme-primary/20 hover:bg-theme-primary-hover" />
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-primary text-xs font-bold text-white shadow-md">
                AM
              </div>
              <span className="text-sm font-bold text-white/90">{appName}</span>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8 transition-all duration-300">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
