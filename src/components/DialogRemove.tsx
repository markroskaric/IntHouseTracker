import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { IntHouseProp } from "@/types";
import { deleteIntHouseObject } from "@/routes/inthouse/Function";
import { router } from "@/routes/router";
import { RootRoute } from "@/routes/__root";
import { Link } from "@tanstack/react-router";

type DialogRemoveProps = {
    data: IntHouseProp;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function DialogRemove({ data, open, onOpenChange }: DialogRemoveProps) {
    const handleDelete = async (id: number) => {
        try {
            await deleteIntHouseObject(id);
            onOpenChange(false);
            router.navigate({ to: "/" });
        } catch (error) {
            console.error("Error occurred during deletion:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Confirm Deletion {data.name}{" "}
                        <span className="text-xs">({data.inHouse_app_id})</span>
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        id="btnSubmit"
                        onClick={() => onOpenChange(false)} // Close the dialog
                        className="bg-white"
                    >
                        Cancel
                    </Button>
                    <Link to="/">
                        <Button
                            type="button" // Use button type for actions
                            className="bg-red-500 hover:bg-red-700"
                            onClick={async () => {
                                await handleDelete(data.inHouse_ID); // Call delete function
                            }}
                        >
                            Confirm Delete
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
