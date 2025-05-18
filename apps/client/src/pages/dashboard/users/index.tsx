import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Label} from "@radix-ui/react-label";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import moment from "jalali-moment";

export const UsersPage = () => {
    return (
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
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        1
                    </TableCell>
                    <TableCell>
                        test username
                    </TableCell>
                    <TableCell>
                        test name
                    </TableCell>
                    <TableCell>
                        0900000000
                    </TableCell>
                    <TableCell>
                        <Checkbox checked className="w-4 h-4 mx-auto" />
                    </TableCell>
                    <TableCell>
                        {moment().add(1, 'day').format('jYYYY-jMM-jDD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                        {moment().format('jYYYY-jMM-jDD HH:mm:ss')}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </div>
    );
};
