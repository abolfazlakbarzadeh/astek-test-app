import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {productCreateSchema} from "@/pages/dashboard/products/productCreateSchema.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import type {FC} from "react";
import type {Product} from "@/types.ts";
import {ProductsService} from "@/services/products-service.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {usePermission} from "@/lib/hooks.ts";
import {permissions} from "@/lib/permissions.ts";

export const ProductForm: FC<{ edit?: boolean, data?: Product }> = (props) => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof productCreateSchema>>({
        resolver: zodResolver(productCreateSchema),
        defaultValues: props.edit ? props.data : {}
    });
    usePermission(props.edit ? permissions.product_management.edit : permissions.product_management.create, () => {
        navigate("/dashboard/products");
    }, () => {
    })

    const handleSubmit = async (values: z.infer<typeof productCreateSchema>) => {
        let result;
        if (props.edit)
            result = await ProductsService.edit(props.data!.id, values)
        else
            result = await ProductsService.create(values)
        toast.success(result.data.message)
        navigate("/dashboard/products");
    }

    return (
        <div className="w-full pt-2">
            <Card>
                <CardHeader>
                    Create Product
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
                                <FormField control={form.control} name="price" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input type="number" placeholder="price" {...field}
                                                   onChange={({target: {value}}) => field.onChange(Number(value))}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="description" render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl className="mt-2">
                                            <Textarea placeholder="description" {...field} />
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
