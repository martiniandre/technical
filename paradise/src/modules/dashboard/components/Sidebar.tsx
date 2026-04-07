import { Home, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { DEFAULT_APP_NAME } from '../../../shared/constants';
import { SYSTEM_ROLES } from '../../../shared/services/dto/auth';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar
} from '@/shared/components/ui/sidebar';
import { cn } from '@/shared/lib/utils';

const appName = import.meta.env.VITE_APP_NAME || DEFAULT_APP_NAME;

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
];

export function Sidebar({ className, ...props }: React.ComponentProps<typeof SidebarPrimitive>) {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  const role = user?.role ? SYSTEM_ROLES[user.role] : SYSTEM_ROLES.viewer

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  return (
    <SidebarPrimitive
      variant="floating"
      collapsible="icon"
      className={cn("bg-theme-comp-1 border-theme-comp-5 shadow-xl transition-all duration-300", className)}
      {...props}
    >
      <SidebarHeader className="flex flex-row items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-theme-primary text-lg font-bold text-white shadow-lg shadow-theme-primary/20">
          AM
        </div>
        {isExpanded && (
          <div className="flex flex-col min-w-0 transition-opacity duration-300">
            <span className="truncate text-base font-bold text-white/90">{appName}</span>
            <span className="truncate text-[11px] font-medium text-white/70">{role}</span>
          </div>
        )}
        <div className="absolute -right-3 top-8 z-20">
          <SidebarTrigger className="h-6 w-6 rounded-full bg-theme-primary text-white border-none shadow-md hover:scale-110 hover:bg-theme-primary transition-transform" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    tooltip={label}
                    isActive={window.location.pathname === to}
                    render={({ className: btnClassName, ...btnProps }) => (
                      <NavLink
                        to={to}
                        end={to === '/dashboard'}
                        className={({ isActive }) =>
                          cn(
                            btnClassName,
                            "flex items-center rounded-xl px-3 py-3 transition-all duration-200",
                            isActive
                              ? "bg-theme-primary text-white shadow-md shadow-theme-primary/20 hover:bg-theme-primary"
                              : "text-white/70 hover:bg-theme-comp-5 hover:text-white/90"
                          )
                        }
                        {...btnProps}
                      >
                        <Icon size={20} className="shrink-0" />
                        {isExpanded && <span className="ml-3">{label}</span>}
                      </NavLink>
                    )}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-theme-comp-5 p-4 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={20} className="shrink-0" />
              {isExpanded && <span className="ml-3">Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
