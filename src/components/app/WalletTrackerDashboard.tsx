import { WalletDashboardData } from '@/contexts/app/AppContext';
import React from 'react';

interface DashboardProps {
  data: WalletDashboardData;
}

const WalletTrackerDashboard: React.FC<DashboardProps> = ({ data }) => {
  const formatNumber = (num: number) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formatPercentage = (num: number) => num.toFixed(1);

  return (
    <div className="w-full flex flex-row items-center gap-4 h-[280px]">
      <div className="flex flex-col items-center gap-4 w-[calc(45%-200px)] border border-[#9C46EB] rounded-3xl p-4 h-full">
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col'>
            <div className="text-base font-medium">7D Realized PnL/USD</div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-[32px] font-bold">{formatPercentage(data.pnl_7d || 0)}%</span>
              <span className="text-base font-medium">${formatNumber(data.realized_profit_7d || 0)}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-medium">Win Rate</div>
            <span className="text-[32px] font-bold">{formatPercentage(data.winrate || 0)}%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className='flex flex-row justify-between'>
            <div className="text-base text-[#9aa0aa]">Total PnL</div>
            <div className={`text-base ${(data.total_profit || 0) >= 0 ? 'text-[#88d693]' : 'text-[#f04866]'}`}>
              +${formatNumber(data.total_profit || 0)} ({formatPercentage(data.total_profit_pnl || 0)}%)
            </div>
          </div>
          <div className='flex flex-row justify-between'>
            <div className="text-base text-[#9aa0aa]">Unrealized Profits</div>
            <div className={`text-base ${(data.unrealized_profit || 0) >= 0 ? 'text-[#88d693]' : 'text-[#f04866]'}`}>
              ${formatNumber(data.unrealized_profit || 0)}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-1 gap-4 h-full'>
        <div className='flex flex-col w-full h-full'>
          <div className='flex flex-row items-center gap-4 h-full'>
            <div className='flex flex-col w-[calc(48%-8px)] border border-[#9C46EB] rounded-3xl p-4 h-full'>
              <div className="bg-[#050510] rounded-lg">
                <h3 className="text-xl mb-4">Analysis</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-[#9aa0aa]">Bal</span>
                    <div className="flex flex-col items-end">
                      <span>{parseFloat(data.sol_balance || '0').toFixed(2)} SOL</span>
                      {/* <span className="text-sm text-[#9aa0aa]">${formatNumber(data.total_value || 0)}</span> */}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7D TXs</span>
                    <span>{data.buy_7d || 0}/{data.sell_7d || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7D Avg Duration</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-400">7D Total Cost</div>
                    <div>${formatNumber(data.token_avg_cost || 0)}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7D Token Avg Cost</span>
                    <span>${formatNumber(data.token_avg_cost || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7D Token Avg Realized Profits</span>
                    <span>${formatNumber(data.token_sold_avg_profit || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-[calc(48%-8px)] border border-[#9C46EB] rounded-3xl p-4 h-full'>
              <div className="bg-[#050510] rounded-lg ">
                <h3 className="text-xl text-white mb-4">Distribution ({data?.token_num || 0})</h3>
                <div className="space-y-2">
                  {[
                    { label: '>500%', value: data?.pnl_gt_5x_num || 0, color: '#88d693' },
                    { label: '200% - 500%', value: data?.pnl_2x_5x_num || 0, color: '#88d693b3' },
                    { label: '0% - 200%', value: data?.pnl_lt_2x_num || 0, color: '#88d69380' },
                    { label: '0% - -50%', value: data?.pnl_minus_dot5_0x_num || 0, color: '#f0486680' },
                    { label: '<-50%', value: data?.pnl_lt_minus_dot5_num || 0, color: '#f04866' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between text-white">
                      <div className='flex flex-row items-center gap-1'>
                        <div className='w-4 h-4 rounded-full' style={{ backgroundColor: item.color }} />
                        <span className="text-gray-400">{item.label}</span>
                      </div>
                      <span style={{ color: '#9AA0AA' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTrackerDashboard; 