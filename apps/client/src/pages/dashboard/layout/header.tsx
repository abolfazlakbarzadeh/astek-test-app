import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/context/auth-context.tsx";

export function SiteHeader() {

    const {logout} = useAuth()

    return (
        <header
            className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center justify-between gap-1 lg:gap-2 ">
                <h1 className="text-base font-medium py-2">Management Panel</h1>
                <Button variant="outline" onClick={logout}>
                    Logout
                </Button>
            </div>
        </header>
    )
}
