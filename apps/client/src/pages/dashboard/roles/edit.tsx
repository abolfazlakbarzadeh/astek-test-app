import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router";
import {useEffect} from "react";
import {LoadingOverlay} from "@/components/loading-overlay.tsx";
import {RolesService} from "@/services/roles-service.ts";
import {RoleForm} from "@/pages/dashboard/roles/form.tsx";

export const EditRolePage = () => {
    const params = useParams()
    const roleQuery = useQuery({
        queryKey: ['roles', 'role'],
        queryFn: () => {
            return RolesService.get(Number(params.id))
        },
        enabled: false,
        staleTime: 0,
        retry: 0
    })

    useEffect(() => {
        if (params.id)
            roleQuery.refetch()
    }, [params.id, params]);

    return roleQuery.isLoading || !roleQuery.data ? <LoadingOverlay/> : (
        <RoleForm key={roleQuery.data.data!.id + roleQuery.data.data.permissions.toString()} data={roleQuery.data!.data} edit/>
    )
}
