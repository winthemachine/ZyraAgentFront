import AppTable from "../common/AppTable";
import { HoldingData } from "@/contexts/app/AppContext";
interface Props {
  data: HoldingData[];
  loading: boolean;
}

const WalletRankings: React.FC<Props> = ({ data, loading }) => {
  const formatNumber = (num: number) => {
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const formattedNum = absNum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isNegative ? `-$${formattedNum}` : `$${formattedNum}`;
  };

  const formatPercentage = (num: number) => {
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    return `${isNegative ? '-' : '+'}${absNum.toFixed(1)}%`;
  };

  const getTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() / 1000 - timestamp) / (24 * 60 * 60));
    return `${days}d`;
  };

  const getProfitColor = (value: number) => {
    return value >= 0 ? "text-[#42d578]" : "text-[#ea3921]";
  };

  const columns = [
    {
      header: 'Token/Last Active',
      accessor: (row: HoldingData) => (
        <div className="flex items-center gap-2">
          {row.token.logo && row.token.logo !== '' && (
            <img src={row.token.logo} alt={''} className="w-10 h-10 rounded-full" />
          )}
          <div>
            <div>{row.token.symbol}</div>
            <div className="text-sm text-gray-400">
              {getTimeAgo(parseInt(row.last_active_timestamp))}
            </div>
          </div>
        </div>
      ),
      className: 'text-left'
    },
    {
      header: 'Unrealized',
      accessor: (row: HoldingData) => {
        const profit = parseFloat(row.unrealized_profit);
        const pnl = parseFloat(row.unrealized_pnl);
        return (
          <div>
            {profit === 0 ? (
              <div className="text-[#ea3921]">Sell All</div>
            ) : (
              <div className={getProfitColor(profit)}>
                {formatNumber(profit)}
              </div>
            )}
            <div className={`text-sm ${getProfitColor(pnl)}`}>
              {formatPercentage(pnl * 100)}
            </div>
          </div>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Realized Profit',
      accessor: (row: HoldingData) => {
        const profit = parseFloat(row.realized_profit);
        const pnl = parseFloat(row.realized_pnl || '0');
        return (
          <div>
            <div className={getProfitColor(profit)}>
              {formatNumber(profit)}
            </div>
            <div className={`text-sm ${getProfitColor(pnl)}`}>
              {formatPercentage(pnl * 100)}
            </div>
          </div>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Total Profit',
      accessor: (row: HoldingData) => {
        const profit = parseFloat(row.total_profit);
        const pnl = parseFloat(row.total_profit_pnl);
        return (
          <div>
            <div className={getProfitColor(profit)}>
              {formatNumber(profit)}
            </div>
            <div className={`text-sm ${getProfitColor(pnl)}`}>
              {formatPercentage(pnl * 100)}
            </div>
          </div>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Balance/USD',
      accessor: (row: HoldingData) => (
        <div>
          <div>{formatNumber(parseFloat(row.usd_value))}</div>
          <div className="text-sm text-gray-400">{row.balance}</div>
        </div>
      ),
      className: 'text-left'
    },
    {
      header: 'Position %',
      accessor: (row: HoldingData) => `${formatPercentage(parseFloat(row.position_percent) * 100)}`,
      className: 'text-left'
    },
    {
      header: 'Holding Duration',
      accessor: (row: HoldingData) => getTimeAgo(parseInt(row.start_holding_at)),
      className: 'text-left'
    },
    {
      header: 'Bought/Avg',
      accessor: (row: HoldingData) => (
        <div>
          <div>{formatNumber(parseFloat(row.history_bought_cost))}</div>
          <div className="text-sm text-gray-400">{formatNumber(parseFloat(row.avg_cost))}</div>
        </div>
      ),
      className: 'text-left'
    },
    {
      header: 'Sold/Avg',
      accessor: (row: HoldingData) => (
        <div>
          <div>{formatNumber(parseFloat(row.history_sold_income))}</div>
          <div className="text-sm text-gray-400">{formatNumber(parseFloat(row.avg_sold))}</div>
        </div>
      ),
      className: 'text-left'
    }
  ];

  return (
    <div className="bg-[rgba(5,5,16,1)] rounded-[20px] p-1 lg:p-6">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9c46eb]"></div>
        </div>
      ) : (
        <AppTable
          columns={columns}
          data={data}
          pagination={true}
          itemsPerPage={10}
          className="mt-8"
        />
      )}
    </div>
  );
};

export default WalletRankings;