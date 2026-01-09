import { db } from "@/app/_lib/prisma"
import "server-only"

export const getTotalProducts = async (): Promise<number> => {
    return db.product.count()
}