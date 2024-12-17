import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link } from "@tanstack/react-router";
import DialogRemove from "./DialogRemove";
import { IntHouseProp } from "@/types";
import { FaHouse } from "react-icons/fa6";
type PopoverBtnProps = {
    data: IntHouseProp; // Type for children
};

export function PopoverBtn({ data }: PopoverBtnProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <IoMdMore className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link to="/IntHouse" state={{ data: data }}>
                            <DropdownMenuItem className="cursor-pointer">
                                <IoStatsChart />
                                <span>Stats</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link to="/Edit" state={{ data: data }}>
                            <DropdownMenuItem className="cursor-pointer">
                                <MdEdit />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                            <FaHouse />
                            <span>IntHouse</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setDialogOpen(true)}
                        >
                            <MdDelete />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog Component */}
            <DialogRemove data={data} open={dialogOpen} onOpenChange={setDialogOpen} />
        </>
    );
}
