"use client"

import React, { useState } from 'react';
import {
ColumnDef,
flexRender,
getCoreRowModel,
useReactTable,
getPaginationRowModel,
} from "@tanstack/react-table"

import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Separator } from './ui/separator';

interface DataTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[]
data: TData[]
}

export function DataTable<TData, TValue>({
columns,
data,
}: DataTableProps<TData, TValue>) {
const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

const table = useReactTable({
data,
columns,
pageCount: Math.ceil(data.length / pagination.pageSize),
state: {
pagination,
},
onPaginationChange: setPagination,
getCoreRowModel: getCoreRowModel(),
getPaginationRowModel: getPaginationRowModel(),
})

return (
<div className="rounded-md border bg-white">
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
{flexRender(cell.column.columnDef.cell, cell.getContext())}
</TableCell>
))}
</TableRow>
))
) : (
<TableRow>
<TableCell colSpan={columns.length} className="h-24 text-center">
No results.
</TableCell>
</TableRow>
)}
</TableBody>
</Table>
<Separator/>

</div>
)
}