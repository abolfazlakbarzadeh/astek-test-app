import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/pages/dashboard/layout/sidebar.tsx";
import {SiteHeader} from "@/pages/dashboard/layout/header.tsx";
import {Outlet} from "react-router";

export const DashboardLayout = () => {
    return (
        <SidebarProvider
            defaultOpen
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col"><Outlet /></div>
            </SidebarInset>
        </SidebarProvider>
    );
};
