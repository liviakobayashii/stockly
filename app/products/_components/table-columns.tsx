"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button"
import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import DeleteProductDialogContent from "./delete-dialog-content"

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
        cell: (row) => {
            const product = row.row.original
            return (
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <MoreHorizontalIcon size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-1.5" onClick={() => navigator.clipboard.writeText(product.id)}>
                                <ClipboardCopyIcon size={16} />
                                Copiar ID
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-1.5">
                                <EditIcon size={16} />
                                Editar
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="gap-1.5">
                                    <TrashIcon size={16} />
                                    Deletar
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteProductDialogContent productId={product.id} />
                </AlertDialog>

            )
        }
    },
]