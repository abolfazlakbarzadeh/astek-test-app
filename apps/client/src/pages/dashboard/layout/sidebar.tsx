import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar.tsx";
import {SidebarUsers} from "@/pages/dashboard/layout/sidebar-users.tsx";
import {IconCirclePlus, IconInnerShadowTop, IconList} from "@tabler/icons-react";

export const AppSidebar = (props: any) => {

    const users = [{
        title: 'List',
        icon: IconList,
        url: '/dashboard/users'
    }, {
        title: 'Create',
        icon: IconCirclePlus,
        url: '/dashboard/users/create'
    }]
    const products = [{
        title: 'List',
        icon: IconList,
        url: '/dashboard/products'
    }, {
        title: 'Create',
        icon: IconCirclePlus,
        url: '/dashboard/products/create'
    }]
    const role = [{
        title: 'List',
        icon: IconList,
        url: '/dashboard/role'
    }, {
        title: 'Create',
        icon: IconCirclePlus,
        url: '/dashboard/role/create'
    }]


    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <IconInnerShadowTop className="!size-5"/>
                                <span className="text-base font-semibold">Panel</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarUsers title="User Management" items={users}/>
                <SidebarUsers title="Product Management" items={products}/>
                <SidebarUsers title="Role Management" items={role}/>
            </SidebarContent>
        </Sidebar>
    );
};
