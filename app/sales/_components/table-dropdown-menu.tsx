import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button"
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { Product } from "@prisma/client";

interface SalesTableDropdwonMenuProps {
    product: Pick<Product, 'id'> //so vai pegar a propriedade id do produto
    onDelete: (productId: string) => void
}

const SalesTableDropdwonMenu = ({ product, onDelete }: SalesTableDropdwonMenuProps) => {
    return (
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
                <DropdownMenuItem className="gap-1.5" onClick={() => onDelete(product.id)}>
                    <TrashIcon size={16} />
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default SalesTableDropdwonMenu;