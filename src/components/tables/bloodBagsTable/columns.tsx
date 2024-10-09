import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { BloodBagTypes } from "@/components/forms/ManageBloodBagForm"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<BloodBagTypes>[] = [
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
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Code
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("code")}</div>,
    },
    {
        accessorKey: "bloodType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Blood Type
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("bloodType")}</div>,
    },
    {
        accessorKey: "bloodGroup",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Blood Group
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("bloodGroup")}</div>,
    },
    {
        accessorKey: "rhesis",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rhesis
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("rhesis")}</div>,
    },
    {
        accessorKey: "expirationDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expiration Date
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{new Date(row.getValue("expirationDate")).toDateString()}</div>,
    },
    {
        accessorKey: "bloodQuality",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Blood Quality
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const quality = row.getValue("bloodQuality");
            let variant: "outline" | "secondary" | "default" | "destructive" = "default";
            if (quality === "Good") {
                variant = "outline"
            } else if (quality === "Moderate") {
                variant = "secondary"
            } else if (quality === "Expired") {
                variant = "default"
            }
            return (
                <div>
                    <Badge variant={variant}>{row.getValue("bloodQuality")}</Badge>
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const bag = row.original

            return (
                <Button variant="link" size={'sm'}>
                    <Link to={`/dashboard/r/bags/${bag.id}`}>View More</Link>
                </Button>
            )
        },
    },
]