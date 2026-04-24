import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarGroup, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import Link from "next/link"; // <-- NUEVA IMPORTACIÓN DE NEXT.JS

// Importaciones de MUI
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Overview", icon: DashboardOutlinedIcon, url: "/dashboard" },
    { title: "Repositories", icon: FolderOutlinedIcon, url: "/dashboard/repos" },
    { title: "Templates", icon: PaletteOutlinedIcon, url: "/dashboard/templates" },
    { title: "Preview", icon: VisibilityOutlinedIcon, url: "/dashboard/preview", active: true },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border bg-card flex flex-col">
          
          <SidebarHeader className="p-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                <GitHubIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-none">Developer Console</span>
                <span className="text-[10px] font-mono text-muted-foreground mt-1 uppercase">Portfolio Engine v1.0</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-primary text-primary-foreground py-2.5 rounded-md font-bold text-xs hover:bg-primary/90 transition-colors uppercase tracking-wider">
              Deploy Portfolio
            </button>
          </SidebarHeader>

          <SidebarContent className="px-4 py-4">
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={item.active ? "bg-primary/5 text-primary border-l-2 border-primary rounded-none" : ""}>
                      {/* CAMBIO AQUÍ: Usar <Link> en lugar de <a> */}
                      <Link href={item.url} className="flex items-center gap-3 py-6">
                        <item.icon fontSize="small" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-6 border-t border-border/50">
            <div className="flex flex-col gap-4 text-muted-foreground">
               {/* CAMBIO AQUÍ: Usar <Link> en lugar de <a> */}
               <Link href="#" className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-tighter hover:text-foreground transition-colors">
                 <DescriptionOutlinedIcon fontSize="small" /> Documentation
               </Link>
               <Link href="#" className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-tighter hover:text-foreground transition-colors">
                 <HelpOutlineOutlinedIcon fontSize="small" /> Support
               </Link>
            </div>
          </SidebarFooter>

        </Sidebar>

        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
          <div className="flex-1 overflow-y-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}