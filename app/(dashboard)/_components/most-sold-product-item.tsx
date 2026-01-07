import ProductStatusBadge from "@/app/_components/product-status-badge"
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard"
import { formatCurrency } from "@/app/_helpers/currency"

interface MostSoldProductItemProps {
    product: MostSoldProductDto
}

const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-[6px]">
                <ProductStatusBadge status={product.status} />
                <p className="font-semibold">{product.name}</p>
                <p className="text-slate-500 font-medium">{formatCurrency(Number(product.price))}</p>
            </div>
            <div>
                <p className="font-semibold text-sm">{product.totalSold} vendido(s)</p>
            </div>
        </div>
    )
}
export default MostSoldProductItem