"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"
import ProductTableDropdownMenu from "./table-dropdown-menu"

const getStatusLabel = (status: string) => {
    if (status === "IN_STOCK") {
        return "Em Estoque"
    } return "Fora de Estoque"
}

export const productTableColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Produto",
    },
    {
        accessorKey: "price",
        header: "Valor unitário",
        cell: (row) => {
            const product = row.row.original
            return Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(Number(product.price))
        }
    },
    {
        accessorKey: "stock",
        header: "Estoque",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (row) => {
            const product = row.row.original
            const label = getStatusLabel(product.status)
            return (
                <Badge variant={label === "Em Estoque" ? "default" : "outline"} className="gap-1.5">
                    <CircleIcon size={14} className={`${label === "Em Estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`} />
                    {label}
                </Badge>
            )
        }
    },
    {
        accessorKey: "action",
        header: "Ações",
        cell: (row) => <ProductTableDropdownMenu product={row.row.original} />
    },
]