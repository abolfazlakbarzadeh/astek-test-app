import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Label} from "@radix-ui/react-label";
import moment from "jalali-moment";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {IconDots, IconEdit, IconTrash} from "@tabler/icons-react";
import {Command, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useQuery} from "@tanstack/react-query";
import {ProductsService} from "@/services/products-service.ts";
import {toast} from "react-toastify";
import {useMemo} from "react";
import {Link} from "react-router";
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

export const ProductsPage = () => {
    const productsQuery = useQuery({
        queryKey: ['products', 'all'],
        queryFn: ProductsService.getAll,
        staleTime: 0,
        retry: 0,
    })


    const handleDelete = async (product_id: number) => {
        const result = await ProductsService.delete(product_id)
        toast.success(result.data.message)
        await productsQuery.refetch()
    }

    const rows = useMemo(() => {
        if (productsQuery.data) {
            return productsQuery.data.data.map(item => (
                <TableRow key={item.id}>
                    <TableCell>
                        {item.id}
                    </TableCell>
                    <TableCell>
                        {item.name}
                    </TableCell>
                    <TableCell>
                        <span className="leading-3">
                            {item.description}
                        </span>
                    </TableCell>
                    <TableCell>
                        {(item.price).toLocaleString()}
                    </TableCell>
                    <TableCell>
                        {item.user!.name}
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
                                        <CommandItem>
                                            <Link to={`/dashboard/products/${item.id}`}
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
                                                                Are you sure you want to delete this product?
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
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            ))
        }
        return []
    }, [productsQuery.isSuccess, productsQuery.data?.data])

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
                            Description
                        </TableHead>
                        <TableHead>
                            Price
                        </TableHead>
                        <TableHead>
                            Creator
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
