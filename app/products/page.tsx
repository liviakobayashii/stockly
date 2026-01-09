import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/create-product-button";
import Header, {
    HeaderLeft,
    HeaderRight,
    HeaderSubtitle,
    HeaderTitle,
} from "../_components/header";

const ProductsPage = async () => {
    const products = await getProducts();
    return (
        <div className="m-4 space-y-8 rounded-lg bg-white p-4 overflow-auto md:m-8 md:p-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
                    <HeaderTitle>Produtos</HeaderTitle>
                </HeaderLeft>
                <HeaderRight>
                    <AddProductButton />
                </HeaderRight>
            </Header>
            <DataTable columns={productTableColumns} data={products} />
        </div>
    );
};

export default ProductsPage;