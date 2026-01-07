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
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import { ClipboardCopyIcon, EditIcon, Loader2Icon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"
import { deleteSale } from "@/app/_actions/sale/delete-sale"

interface SalesTableDropdownMenuProps {
    sale: Pick<Product, 'id'>
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
    const { execute } = useAction(deleteSale, {
        onSuccess: () => {
            toast.success("Venda deletada com sucesso!")
        },
        onError: () => {
            toast.error("Erro ao deletar a venda.")
        }
    })
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(sale.id)
        toast.success("ID copiado para a área de transferência.")
    }

    const handleConfirmDeleteClick = () => {
        execute({ id: sale.id })
    }

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
                    <DropdownMenuItem className="gap-1.5" onClick={handleCopyToClipboard}>
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
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está prestes a deletar esta venda. Esta ação não pode ser desfeita. Deseja continuar?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDeleteClick} disabled={status === "executing"}>
                        {status === "executing" && (
                            <Loader2Icon className="animate-spin" size={16} />
                        )}
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>

    )
}

export default SalesTableDropdownMenu;