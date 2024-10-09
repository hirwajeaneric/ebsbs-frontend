"use client"

import * as React from "react"
import { ChevronDownIcon, } from "@radix-ui/react-icons"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { columns } from "./columns"

export interface BloodInTransactionsTypes {
  id: string;

  rhP_O: number;
  rhP_A: number;
  rhP_B: number;
  rhP_AB: number;
  rhN_O: number;
  rhN_A: number;
  rhN_B: number;
  rhN_AB: number;
  totalWholeBlood: number;

  plasmaRhP_O: number;
  plasmaRhP_A: number;
  plasmaRhP_B: number;
  plasmaRhP_AB: number;
  plasmaRhN_O: number;
  plasmaRhN_A: number;
  plasmaRhN_B: number;
  plasmaRhN_AB: number;
  totalPlasmas: number;

  plateletRhP_O: number;
  plateletRhP_A: number;
  plateletRhP_B: number;
  plateletRhP_AB: number;
  plateletRhN_O: number;
  plateletRhN_A: number;
  plateletRhN_B: number;
  plateletRhN_AB: number;
  totalPlatelets: number;

  rbcP_O: number;
  rbcP_A: number;
  rbcP_B: number;
  rbcP_AB: number;
  rbcN_O: number;
  rbcN_A: number;
  rbcN_B: number;
  rbcN_AB: number;
  totalRedBloodCells: number;
  requestId: string;

  totalBags: number;

  createdAt: Date;
  updatedAt: Date;

  hospitalId?: string;
}

export function BloodInTransactionsTable({ bloodInTransactions }: { bloodInTransactions: BloodInTransactionsTypes[] }) {

  bloodInTransactions.forEach((transaction: BloodInTransactionsTypes) => {
    let plasmas = 0;
    let platelets = 0;
    let redBloodCells = 0;
    let wholeBlood = 0;

    plasmas += transaction.plasmaRhN_A + transaction.plasmaRhN_B + transaction.plasmaRhN_O + transaction.plasmaRhP_A + transaction.plasmaRhP_B + transaction.plasmaRhP_O + transaction.plasmaRhP_AB + transaction.plasmaRhN_AB;
    platelets += transaction.plateletRhN_A + transaction.plateletRhN_B + transaction.plateletRhN_O + transaction.plateletRhP_A + transaction.plateletRhP_B + transaction.plateletRhP_O + transaction.plateletRhP_AB + transaction.plateletRhN_AB;
    redBloodCells += transaction.rbcN_A + transaction.rbcN_B + transaction.rbcN_O + transaction.rbcN_AB + transaction.rbcP_A + transaction.rbcP_B + transaction.rbcP_O + transaction.rbcP_AB;
    wholeBlood += transaction.rhN_A + transaction.rhN_B + transaction.rhN_O + transaction.rhP_A + transaction.rhP_B + transaction.rhP_O + transaction.rhP_AB + transaction.rhN_AB;

    transaction.totalPlasmas = plasmas;
    transaction.totalPlatelets = platelets;
    transaction.totalRedBloodCells = redBloodCells;
    transaction.totalWholeBlood = wholeBlood;
    transaction.totalBags = plasmas + platelets + redBloodCells + wholeBlood;
  })

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: bloodInTransactions,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by Date"
          value={(table.getColumn("createdAt")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("createdAt")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
