"use client"

import { Button } from "@/app/_components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { NumericFormat } from "react-number-format";


const formSchema = z.object({
    name: z.string().trim().min(1, { message: "O nome do produto é obrigatório." }),
    price: z.number().min(0.01, { message: "O preço do produto é obrigatório." }),
    stock: z.number().int().min(0, {
        message: "A quantidade em estoque é obrigatória.",
    }),
});

type FormSchema = z.infer<typeof formSchema>

const AddProductButton = () => {
    const form = useForm<FormSchema>({
        shouldUnregister: true, // Quando fecha o dialog, limpa os dados do formulário
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            stock: 1,
        }
    })

    const onSubmit = (data: FormSchema) => {
        console.log({ data })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo Produto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Criar Produto</DialogTitle>
                            <DialogDescription>Insira as informações abaixo</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Produto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do produto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <NumericFormat
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            fixedDecimalScale
                                            decimalScale={2}
                                            prefix="R$ "
                                            allowNegative={false}
                                            customInput={Input}
                                            onValueChange={(values) =>
                                                field.onChange(values.floatValue)
                                            }
                                            {...field}
                                            onChange={() => { }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estoque</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Digite o estoque do produto"
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="reset" variant="secondary">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default AddProductButton;