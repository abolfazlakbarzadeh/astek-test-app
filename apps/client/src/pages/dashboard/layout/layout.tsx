import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/pages/dashboard/layout/sidebar.tsx";
import {SiteHeader} from "@/pages/dashboard/layout/header.tsx";
import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context.tsx";

export const DashboardLayout = () => {

    const {loggedIn} = useAuth()
    const navigate = useNavigate();


    useEffect(() => {
        if (!loggedIn)
            navigate("/auth/login", {replace: true});
    }, [loggedIn]);
    
    return (
        <SidebarProvider
            defaultOpen
        >
            <AppSidebar variant="inset"/>
            <SidebarInset>
                <SiteHeader/>
                <div className="flex flex-1 flex-col"><Outlet/></div>
            </SidebarInset>
        </SidebarProvider>
    );
};
