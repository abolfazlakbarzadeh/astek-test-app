import {UserForm} from "@/pages/dashboard/users/form.tsx";
import {useQuery} from "@tanstack/react-query";
import {UsersService} from "@/services/users-service.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import {LoadingOverlay} from "@/components/loading-overlay.tsx";

export const EditUserPage = () => {
    const params = useParams()
    const userQuery = useQuery({
        queryKey: ['users', 'user'],
        queryFn: () => {
            return UsersService.get(Number(params.id))
        },
        enabled: false,
        staleTime: 0,
        retry: 0
    })

    useEffect(() => {
        if (params.id)
            userQuery.refetch()
    }, [params.id, params]);

    return userQuery.isLoading || !userQuery.data ? <LoadingOverlay/> : (
        <UserForm key={userQuery.data.data!.id} data={userQuery.data!.data} edit/>
    )
}
