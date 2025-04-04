import React, { useState, useEffect } from 'react'
import WalletRankings from '@/components/app/WalletRankings'
import WalletTrackerDashboard from '@/components/app/WalletTrackerDashboard'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useParams } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import { WalletDashboardData } from '@/contexts/app/AppContext'

const WalletTrackers: React.FC = () => {
  const { walletDetails, fetchWalletDetails, walletDetailsLoading } = useApp();
  const params = useParams();
  const address = params?.address || '';
  const [activeTab, setActiveTab] = useState<string>("recent");
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    if (address && address !== '') {
      setWalletAddress(address);
      fetchWalletDetails(address);
      setActiveTab("recent");
    }
  }, [address, fetchWalletDetails]);

  if (!address || address === '') return null;

  return (
    <main className='flex flex-col gap-6 container mx-auto mt-[2rem] px-4 sm:px-6 lg:px-8'>

      <div className='flex flex-col'>
        <div className='flex flex-row gap-4'>
          <img src={walletDetails?.dashboard.avatar} className='w-12 h-12 rounded-full' />
          <div className='flex flex-col gap-2'>
            <div className='text-base font-medium'>{walletDetails?.dashboard.name}</div>
            <div className='text-sm text-[#9aa0aa]'>{walletAddress}</div>
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