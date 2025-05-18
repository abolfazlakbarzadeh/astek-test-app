import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Label} from "@radix-ui/react-label";
import moment from "jalali-moment";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {IconDots, IconEdit, IconTrash} from "@tabler/icons-react";
import {Command, CommandItem, CommandList} from "@/components/ui/command.tsx";

export const RolesPage = () => {
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
                    <TableRow>
                        <TableCell>
                            1
                        </TableCell>
                        <TableCell>
                            test role name
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
