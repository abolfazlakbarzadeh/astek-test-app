import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createSchema} from "@/pages/dashboard/products/create.schema.ts";

export const CreateProductPage = () => {

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema)
    });

    const handleSubmit = (values: z.infer<typeof createSchema>) => {

    }

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
                            </div>

                            <Button className="ml-auto" type="submit">Create</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
