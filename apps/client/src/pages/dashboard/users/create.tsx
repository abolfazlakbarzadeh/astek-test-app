import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {createSchema} from "@/pages/dashboard/users/create.schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";

export const CreateUserPage = () => {

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema)
    });

    const handleSubmit = (values: z.infer<typeof createSchema>) => {

    }

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
                                            <Input placeholder="username" {...field} />
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

                            <Button className="ml-auto" type="submit">Create</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
