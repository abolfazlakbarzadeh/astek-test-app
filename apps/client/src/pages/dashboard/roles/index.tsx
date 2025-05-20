import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Label} from "@radix-ui/react-label";
import moment from "jalali-moment";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {IconDots, IconEdit, IconTrash} from "@tabler/icons-react";
import {Command, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useMemo} from "react";
import {Link, useNavigate} from "react-router";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RolesService} from "@/services/roles-service.ts";
import {usePermission} from "@/lib/hooks.ts";
import {permissions} from "@/lib/permissions.ts";
import {useAuth} from "@/context/auth-context.tsx";

export const RolesPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    const roleQuery = useQuery({
        queryKey: ['roles', 'all'],
        queryFn: RolesService.getAll,
        staleTime: 0,
        retry: 0,
        enabled: false
    })
    usePermission(permissions.role_management.view, () => {
        navigate("/dashboard");
    }, () => {
        roleQuery.refetch()
    })


    const handleDelete = async (role_id: number) => {
        const result = await RolesService.delete(role_id)
        toast.success(result.data.message)
        await roleQuery.refetch()
    }

    const rows = useMemo(() => {
        if (roleQuery.data) {
            return roleQuery.data.data.map(item => (
                <TableRow key={item.id}>
                    <TableCell>
                        {item.id}
                    </TableCell>
                    <TableCell>
                        {item.name}
                    </TableCell>
                    <TableCell>
                        {moment(item.updatedAt).format('jYYYY-jMM-jDD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                        {moment(item.createdAt).format('jYYYY-jMM-jDD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                        <Popover>
                            {(auth.user?.role?.permissions.some(per => [permissions.role_management.edit].includes(per)) || auth.user?.is_super_admin) &&
                                <PopoverTrigger>
                                    <IconDots/>
                                </PopoverTrigger>
                            }
                            <PopoverContent>
                                <Command>
                                    <CommandList>
                                        {auth.hasPermission?.(permissions.role_management.edit) && (
                                            <>
                                                <CommandItem>
                                                    <Link to={`/dashboard/roles/${item.id}`}
                                                          className="flex items-center gap-2">
                                                        <IconEdit/>
                                                        Edit
                                                    </Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <div className="flex items-center gap-2">
                                                                <IconTrash color="red"/>
                                                                Delete
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Delete</DialogTitle>
                                                            </DialogHeader>
                                                            <span>
                                                                Are you sure you want to delete this role?
                                                            </span>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button
                                                                        onClick={() => handleDelete(item.id)}>Confirm</Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Dismiss</Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </CommandItem>
                                            </>
                                        )}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            ))
        }
        return []
    }, [roleQuery.isSuccess, roleQuery.data?.data])

    return (
        <div className="flex flex-col gap-2 p-4">
            <Label>
                Roles
            </Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            ID
                        </TableHead>
                        <TableHead>
                            Name
                        </TableHead>
                        <TableHead>
                            Updated At
                        </TableHead>
                        <TableHead>
                            Created At
                        </TableHead>
                        <TableHead>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {...rows}
                </TableBody>
            </Table>
        </div>
    );
};
