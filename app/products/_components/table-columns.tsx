"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";

export const productTableColumns: ColumnDef<ProductDto>[] = [
    {
        accessorKey: "name",
        header: "Produto",
        meta: {
            className: "max-w-[150px] truncate",
        },
    },
    {
        accessorKey: "price",
        header: "Valor unitário",
        cell: (row) => {
            const product = row.row.original;
            return Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(Number(product.price));
        },
    },
    {
        accessorKey: "stock",
        header: "Estoque",
        meta: {
            className: "hidden md:table-cell",
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row: { original: product } }) => {
            return (
                <ProductStatusBadge status={product.status} />
            );
        },
        meta: {
            className: "hidden md:table-cell",
        },
    },
    {
        accessorKey: "actions",
        header: "Ações",
        cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
    },
];