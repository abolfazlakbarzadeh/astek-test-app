import {cn} from "../../lib/utils";
import React from "react";
import {Button} from "../../components/ui/button";
import {Icons} from "../../components/icons";
import {Input} from "../../components/ui/input";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form";
import {Card, CardContent} from "@/components/ui/card.tsx";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const LoginPage = ({className, ...props}: UserAuthFormProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className={cn("grid gap-6", className)} {...props}>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl className="mt-2">
                                            <Input placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 mt-4"
                                    disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                )}
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
};
