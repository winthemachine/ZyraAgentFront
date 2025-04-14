import React, { useState, useEffect } from 'react'
import WalletRankings from '@/components/app/WalletRankings'
import WalletTrackerDashboard from '@/components/app/WalletTrackerDashboard'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useParams } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import { WalletDashboardData, Period } from '@/contexts/app/AppContext'
import IMAGES from '@/utils/images'

const WalletTrackers: React.FC = () => {
  const { walletDetails, fetchWalletDetails, walletDetailsLoading } = useApp();
  const params = useParams();
  const address = params?.address || '';
  const [activeTab, setActiveTab] = useState<string>("recent");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("30d");

  useEffect(() => {
    if (address && address !== '') {
      setWalletAddress(address);
      fetchWalletDetails(address, selectedPeriod);
      setActiveTab("recent");
    }
  }, [address, fetchWalletDetails, selectedPeriod]);

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    if (address) {
      fetchWalletDetails(address, period);
    }
  };

  if (!address || address === '') return null;

  const periodButtons: { value: Period; label: string }[] = [
    { value: '1d', label: '1d' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: 'all', label: 'All' },
  ];

  return (
    <main className='flex flex-col gap-6 container mx-auto mt-[2rem] px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-4 items-center'>
          {walletDetails?.dashboard.avatar && walletDetails?.dashboard.avatar.length > 0 ? (
            <img src={walletDetails?.dashboard.avatar} alt={''} className='w-12 h-12 rounded-full' />
          ) : (
            <img src={IMAGES.icon346} alt={''} className='w-12 h-12 rounded-full' />
          )}
          <div className='flex flex-col gap-2 flex-1 truncate'>
            <div className='text-base font-medium'>{walletAddress}</div>
          </div>
          <div className="flex gap-2">
            {periodButtons.map((button) => (
              <button
                key={button.value}
                onClick={() => handlePeriodChange(button.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPeriod === button.value
                    ? 'bg-[#9C46EB] text-white'
                    : 'bg-[#2A2A35] text-[#AEACAC] hover:bg-[#3A3A45]'
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <WalletTrackerDashboard data={walletDetails?.dashboard as WalletDashboardData || {}} />

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full mt-3"
      >
        <TabsList className="bg-transparent border-b rounded-none w-full border-[#2A2A35] gap-4 pt-0 !flex overflow-x-auto">
          <TabsTrigger
            value="recent"
            className="text-[#fff] data-[state=active]:text-[#9C46EB] data-[state=active]:bg-inherit data-[state=active]:border-b data-[state=active]:border-[#9C46EB] rounded-none whitespace-nowrap"
          >
            Recent PnL
          </TabsTrigger>
          <TabsTrigger
            value="holdings"
            className="text-[#fff] data-[state=active]:text-[#9C46EB] data-[state=active]:bg-inherit data-[state=active]:border-b data-[state=active]:border-[#9C46EB] rounded-none whitespace-nowrap"
          >
            Holdings
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <WalletRankings
        data={activeTab === 'recent' ? walletDetails?.recent ?? [] : walletDetails?.holdings ?? []}
        loading={walletDetailsLoading}
      />
    </main>
  )
}

export default WalletTrackers