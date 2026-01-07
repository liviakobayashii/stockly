import { CircleDollarSign, DollarSign, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { SummaryCard, SummaryIcon, SummaryTitle, SummaryValue } from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";

const Home = async () => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } = await getDashboard()

  return (
    <div className="m-8 w-full space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryIcon>
            <DollarSign />
          </SummaryIcon>
          <SummaryTitle>Receita Total</SummaryTitle>
          <SummaryValue>{formatCurrency(totalRevenue)}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon>
            <DollarSign />
          </SummaryIcon>
          <SummaryTitle>Receita Hoje</SummaryTitle>
          <SummaryValue>{formatCurrency(todayRevenue)}</SummaryValue>
        </SummaryCard>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryIcon>
            <CircleDollarSign />
          </SummaryIcon>
          <SummaryTitle>Vendas Totais</SummaryTitle>
          <SummaryValue>{totalSales}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon>
            <PackageIcon />
          </SummaryIcon>
          <SummaryTitle>Total em estoque</SummaryTitle>
          <SummaryValue>{totalStock}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon>
            <ShoppingBasketIcon />
          </SummaryIcon>
          <SummaryTitle>Produtos</SummaryTitle>
          <SummaryValue>{totalProducts}</SummaryValue>
        </SummaryCard>

      </div>
    </div>
  );
};

export default Home;