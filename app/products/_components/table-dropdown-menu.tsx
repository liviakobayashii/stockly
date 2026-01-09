import { Product } from "@prisma/client"
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
import { Dialog } from "@/app/_components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import UpsertProductDialogContent from "./upsert-dialog-content"
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { useState } from "react"


interface ProductTableDropdownMenuProps {
    product: Product
}

const ProductTableDropdownMenu = ({ product }: ProductTableDropdownMenuProps) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    return (
        <AlertDialog>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="gap-1.5">
                                <EditIcon size={16} />
                                Editar
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="gap-1.5">
                                <TrashIcon size={16} />
                                Deletar
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UpsertProductDialogContent
                    defaultValues={{
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        stock: product.stock,
                    }}
                    setDialogIsOpen={setEditDialogOpen}
                />
                <DeleteProductDialogContent productId={product.id} />
            </Dialog>
        </AlertDialog>


    )
}
export default ProductTableDropdownMenu