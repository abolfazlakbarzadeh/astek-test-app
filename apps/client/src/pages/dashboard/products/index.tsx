import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Label} from "@radix-ui/react-label";
import moment from "jalali-moment";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {IconDots, IconEdit, IconTrash, IconUserCheck} from "@tabler/icons-react";
import {Command, CommandItem, CommandList} from "@/components/ui/command.tsx";

export const ProductsPage = () => {
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
                    <TableRow>
                        <TableCell>
                            1
                        </TableCell>
                        <TableCell>
                            test product name
                        </TableCell>
                        <TableCell>
                            test product description
                        </TableCell>
                        <TableCell>
                            {(15000).toLocaleString()}
                        </TableCell>
                        <TableCell>
                            test user
                        </TableCell>
                        <TableCell>
                            {moment().add(1, 'day').format('jYYYY-jMM-jDD HH:mm:ss')}
                        </TableCell>
                        <TableCell>
                            {moment().format('jYYYY-jMM-jDD HH:mm:ss')}
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
                                                <IconEdit />
                                                Edit
                                            </CommandItem>
                                            <CommandItem>
                                                <IconTrash color="red" />
                                                Delete
                                            </CommandItem>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
