import { WalletList } from "@/components/ui/wallet-list"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050510] text-white container px-4 sm:px-6 lg:px-8 mx-auto mt-[3rem]">
      <Tabs defaultValue="saved" className="mb-6">
        <TabsList className="flex lg:border-t lg:border-b-0 border-b border-[#484848] rounded-none p-0 bg-transparent w-full overflow-x-auto justify-start px-0 gap-8">
          <TabsTrigger
            value="saved"
            className="text-[#878585] pb-2 font-medium whitespace-nowrap rounded-none data-[state=active]:bg-transparent data-[state=active]:text-[#9c46eb] lg:data-[state=active]:border-t-2 data-[state=active]:border-b-2 lg:data-[state=active]:border-b-0 data-[state=active]:border-[#9c46eb] px-0"
          >
            Saved Wallet Address
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="text-[#878585] pb-2 font-medium whitespace-nowrap rounded-none data-[state=active]:bg-transparent data-[state=active]:text-[#9c46eb] lg:data-[state=active]:border-t-2 data-[state=active]:border-b-2 lg:data-[state=active]:border-b-0 data-[state=active]:border-[#9c46eb] px-0"
          >
            Search History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved">
          <WalletList />
        </TabsContent>
        <TabsContent value="history">
          <WalletList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

