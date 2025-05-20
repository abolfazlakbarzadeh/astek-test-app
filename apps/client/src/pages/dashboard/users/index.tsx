import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Label} from "@radix-ui/react-label";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import moment from "jalali-moment";
import {IconDots, IconEdit, IconTrash, IconUserCheck} from "@tabler/icons-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Command, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useQuery} from "@tanstack/react-query";
import {UsersService} from "@/services/users-service.ts";
import {useEffect, useMemo, useState} from "react";
import {LoadingOverlay} from "@/components/loading-overlay.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import type {Role} from "@/types.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {RolesService} from "@/services/roles-service.ts";
import {toast} from "react-toastify";
import {useAuth} from "@/context/auth-context.tsx";
import {permissions} from "@/lib/permissions.ts";

const assignFormSchema = z.object({
    role_id: z.number({required_error: 'required', message: 'required'}),
})


const AssignRoleDialogForm = ({roles, role_id, onChange, loading}: {
    roles: Role[],
    role_id: number,
    onChange: (role_id: number) => void | Promise<void>,
    loading: boolean
}) => {

    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof assignFormSchema>>({
        resolver: zodResolver(assignFormSchema),
        defaultValues: {
            role_id
        }
    });

    const onSubmit = async (data: z.infer<typeof assignFormSchema>) => {
        console.log({
            data

        })
        const result = onChange(data.role_id)
        if (result instanceof Promise) {
            await result
        }
        setOpen(false)

    }

    const selectItems = useMemo(() => {
        return roles.map((role) => (
            <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
        ))
    }, [roles])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="flex items-center gap-2">
                    <IconUserCheck/>
                    Assign Role
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Assign Role</DialogTitle>
                            <DialogDescription>
                                Select role that you wanna assign to this user
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField control={form.control} name="role_id" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl className="mt-2 relative">
                                        <Select value={String(field.value)}
                                                onValueChange={(val) => field.onChange(Number(val))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select role"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {...selectItems}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            {loading && <LoadingOverlay/>}
                        </div>
                        <DialogFooter>
                            <Button type="submit">Assign</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


export const UsersPage = () => {
    const auth = useAuth();
    const usersQuery = useQuery({
        queryKey: ['users', 'all'],
        queryFn: UsersService.getAll,
        staleTime: 0,
        retry: 0
    })
    const rolesQuery = useQuery({
        queryKey: ['roles', 'all'],
        queryFn: RolesService.getAll,
        staleTime: 0,
        retry: 0
    })

    useEffect(() => {
        if (usersQuery.error) {
            console.log({
                error: usersQuery.error
            })
        }
    }, [usersQuery.isError]);


    const onAssignRole = async (user_id: number, role_id: number) => {
        const result = await UsersService.assignRole(user_id, role_id)
        toast.success(result.data.message)
        await usersQuery.refetch()
    }

    const handleDelete = async (user_id: number) => {
        const result = await UsersService.delete(user_id)
        toast.success(result.data.message)
        await usersQuery.refetch()
    }

    const rows = useMemo(() => {
        if (usersQuery.data) {
            return usersQuery.data.data.map(item => (
                <TableRow key={item.id}>
                    <TableCell>
                        {item.id}
                    </TableCell>
                    <TableCell>
                        {item.username}
                    </TableCell>
                    <TableCell>
                        {item.name}
                    </TableCell>
                    <TableCell>
                        {item.phone}
                    </TableCell>
                    <TableCell>
                        <Checkbox checked={item.is_super_admin} className="w-4 h-4 mx-auto"/>
                    </TableCell>
                    <TableCell>
                        {moment(item.updatedAt).format('jYYYY-jMM-jDD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                        {moment(item.createdAt).format('jYYYY-jMM-jDD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                        <Popover>
                            <PopoverTrigger>
                                <IconDots/>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Command>
                                    <CommandList>
                                        {auth.hasPermission?.(permissions.account_management.assignRole) &&
                                            <CommandItem>
                                                <AssignRoleDialogForm role_id={item.role_id}
                                                                      onChange={(role_id) => onAssignRole(item.id, role_id)}
                                                                      roles={rolesQuery.isSuccess ? rolesQuery.data.data : []}
                                                                      loading={rolesQuery.isLoading}/>
                                            </CommandItem>
                                        }

                                        {auth.hasPermission?.(permissions.account_management.edit) && (
                                            <>
                                                <CommandItem>
                                                    <IconEdit/>
                                                    Edit
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
                                                                Are you sure you want to delete this user?
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
    }, [usersQuery.isSuccess, rolesQuery.isLoading, usersQuery.data?.data])

    return (
        <>
            <title>
                Users
            </title>
            <div className="flex flex-col gap-2 p-4">
                <Label>
                    Users
                </Label>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                ID
                            </TableHead>
                            <TableHead>
                                Username
                            </TableHead>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>
                                Phone
                            </TableHead>
                            <TableHead>
                                Super Admin
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
            {usersQuery.isLoading && <LoadingOverlay/>}
        </>
    );
};
