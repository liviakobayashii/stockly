"use client"

import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog"
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

interface DeleteProductDialogContentProps {
    productId: string;
}

const DeleteProductDialogContent = ({ productId }: DeleteProductDialogContentProps) => {

    const { execute: executeDeleteProduct, status } = useAction(deleteProduct, {
        onSuccess: () => {
            toast.success("Produto excluído com sucesso!")
        },
        onError: ({ error: { validationErrors, serverError } }) => {
            const flattenedErrors = flattenValidationErrors(validationErrors);
            toast.error(serverError ?? flattenedErrors.formErrors[0]);
        }
    })

    const handleContinueClick = () => {
        executeDeleteProduct({ id: productId })
    }

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Você está prestes a deletar este produto. Esta ação não pode ser desfeita. Deseja continuar?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueClick} disabled={status === "executing"}>
                    {status === "executing" && (
                        <Loader2Icon className="animate-spin" size={16} />
                    )}
                    Continuar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>


    )
}
export default DeleteProductDialogContent