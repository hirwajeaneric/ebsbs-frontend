import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { RequestTypes } from "@/components/forms/ManageBloodRequestForm"

export const columns: ColumnDef<RequestTypes>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "hospitalName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Hospital
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("hospitalName")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created On
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Request Status
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const requestStatus = row.getValue("status");
            let variant: "outline" | "secondary" | "default" | "destructive" = "default";
            if (requestStatus === "Pending") {
                variant = "outline"
            } else if (requestStatus === "In Process") {
                variant = "secondary"
            } else if (requestStatus === "Delivered") {
                variant = "default"
            }
            return (
                <div>
                    <Badge variant={variant}>{row.getValue("status")}</Badge>
                </div>
            )
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Responsed At
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>
            {row.getValue("updatedAt") ? new Date(row.getValue("updatedAt")).toLocaleString() : "-"}
        </div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const request = row.original

            return (
                <Button variant="link" size={'sm'}>
                    <Link to={`/dashboard/r/requests/${request.id}`}>View More</Link>
                </Button>
            )
        },
    },
]