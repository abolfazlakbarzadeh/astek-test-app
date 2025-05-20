import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {userCreateSchema} from "@/pages/dashboard/users/userCreateSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {type FC, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {RolesService} from "@/services/roles-service.ts";
import {permissions} from "@/lib/permissions.ts";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {UsersService} from "@/services/users-service.ts";
import {usePermission} from "@/lib/hooks.ts";
import type {User} from "@/types.ts";

export const UserForm: FC<{ edit?: boolean, data?: Omit<User, 'role'> }> = (props) => {
    const navigate = useNavigate();

    const rolesQuery = useQuery({
        queryKey: ['roles', 'all'],
        queryFn: RolesService.getAll,
        staleTime: 0,
        retry: 0,
        enabled: false
    })
    usePermission(props.edit ? permissions.account_management.edit : permissions.account_management.create, () => {
        navigate("/dashboard/users");
    }, () => {
        rolesQuery.refetch()
    })

    const form = useForm<z.infer<typeof userCreateSchema>>({
        resolver: zodResolver(userCreateSchema.superRefine((data, ctx) => {
            if (!props.edit && !data.password) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password is required",
                    path: ["password"],
                });
            }
        })),
        defaultValues: props.edit ? props.data : {}
    });

    const handleSubmit = async (values: z.infer<typeof userCreateSchema>) => {
        let result;
        if (props.edit)
            result = await UsersService.edit(props.data!.id, values)
        else
            result = await UsersService.create(values)
        toast.success(result.data.message)
        navigate("/dashboard/users");
    }


    const roleItems = useMemo(() => {
        return rolesQuery.data?.data.map((role) => (
            <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
        )) || []
    }, [rolesQuery.data?.data])


    return (
        <div className="w-full pt-2">
            <Card>
                <CardHeader>
                    Create User
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormField control={form.control} name="username" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input readOnly={props.edit} placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="name" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input placeholder="name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="phone" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input placeholder="phone" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="password" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input type="password" placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
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
                                                    {...roleItems}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="is_super_admin" render={({field}) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl className="mt-2">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                        </FormControl>
                                        <FormLabel className="p-0">Is Super Admin?</FormLabel>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            </div>

                            <Button className="ml-auto" type="submit">
                                {props.edit ? "Edit" : "Create"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
