import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {roleCreateSchema} from "@/pages/dashboard/roles/roleCreateSchema.ts";
import {SimpleTreeView, TreeItem, useTreeViewApiRef} from "@mui/x-tree-view";
import {permissions} from "@/lib/permissions.ts";
import type {FC} from "react";
import type {Role} from "@/types.ts";
import {useNavigate} from "react-router";
import {usePermission} from "@/lib/hooks.ts";
import {RolesService} from "@/services/roles-service.ts";
import {toast} from "react-toastify";

export const RoleForm: FC<{ edit?: boolean, data?: Role }> = (props) => {
    const navigate = useNavigate();
    const apiRef = useTreeViewApiRef();

    const form = useForm<z.infer<typeof roleCreateSchema>>({
        resolver: zodResolver(roleCreateSchema),
        defaultValues: props.edit ? props.data : {}
    });

    const handleSubmit = async (values: z.infer<typeof roleCreateSchema>) => {
        const payload = {
            ...values,
            permissions: values.permissions.filter(item => !['account', 'product', 'role'].includes(item))
        }
        let result;
        if (props.edit)
            result = await RolesService.edit(props.data!.id, payload)
        else
            result = await RolesService.create(payload)
        toast.success(result.data.message)
        navigate("/dashboard/roles");
    }
    usePermission(props.edit ? permissions.role_management.edit : permissions.role_management.create, () => {
        navigate("/dashboard/roles");
    }, () => {
    })

    return (
        <div className="w-full pt-2">
            <Card>
                <CardHeader>
                    Create Role
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormField control={form.control} name="name" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input placeholder="name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="permissions" render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Permissions</FormLabel>
                                        <FormControl className="mt-2">
                                            <SimpleTreeView defaultExpandedItems={['account', 'product', 'role']}
                                                            multiSelect
                                                            checkboxSelection selectedItems={field.value}
                                                            onSelectedItemsChange={(_event, ids) => field.onChange(ids)}
                                                            apiRef={apiRef}>
                                                <TreeItem itemId="account" label="Account Management">
                                                    <TreeItem itemId={permissions.account_management.view}
                                                              label="View"/>
                                                    <TreeItem itemId={permissions.account_management.create}
                                                              label="Create"/>
                                                    <TreeItem itemId={permissions.account_management.edit}
                                                              label="Edit"/>
                                                    <TreeItem itemId={permissions.account_management.assignRole}
                                                              label="Assign Role"/>
                                                </TreeItem>
                                                <TreeItem itemId="product" label="Product Management">
                                                    <TreeItem itemId={permissions.product_management.view}
                                                              label="View"/>
                                                    <TreeItem itemId={permissions.product_management.create}
                                                              label="Create"/>
                                                    <TreeItem itemId={permissions.product_management.edit}
                                                              label="Edit"/>
                                                </TreeItem>
                                                <TreeItem itemId="role" label="Role Management">
                                                    <TreeItem itemId={permissions.role_management.view} label="View"/>
                                                    <TreeItem itemId={permissions.role_management.create}
                                                              label="Create"/>
                                                    <TreeItem itemId={permissions.role_management.edit} label="Edit"/>
                                                </TreeItem>
                                            </SimpleTreeView>
                                        </FormControl>
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
