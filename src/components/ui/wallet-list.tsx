"use client"

import { useState } from "react"
import { Checkbox } from "./checkbox"
import { Search, MoreVertical, SlidersHorizontal } from "lucide-react"

const walletData = [
  { id: 1, address: "0x12A3...9FCD", type: "address" },
  { id: 2, address: "cryptoWhale.eth", type: "ens" },
  { id: 3, address: "0x98BC...4E72", type: "address" },
  { id: 4, address: "defiMaster.eth", type: "ens" },
  { id: 5, address: "0xAB45...C901", type: "address" },
  { id: 6, address: "0xAB45...C901", type: "address" },
  { id: 7, address: "0xAB45...C901", type: "address" },
  { id: 8, address: "0xAB45...C901", type: "address" },
  { id: 9, address: "0xAB45...C901", type: "address" },
  { id: 10, address: "0xAB45...C901", type: "address" },
  { id: 11, address: "0xAB45...C901", type: "address" },
  { id: 12, address: "0xAB45...C901", type: "address" },
]

export function WalletList() {
  const [selectedWallets, setSelectedWallets] = useState<number[]>([])

  const toggleWallet = (id: number) => {
    if (selectedWallets.includes(id)) {
      setSelectedWallets(selectedWallets.filter((walletId) => walletId !== id))
    } else {
      setSelectedWallets([...selectedWallets, id])
    }
  }

  return (
    <div className="rounded-lg border border-[#484848] overflow-hidden">
      <div className="flex justify-end p-2 border-b border-[#484848]">
        <div className="relative flex items-center w-full sm:w-auto">
          <Search className="absolute left-3 h-4 w-4 text-white/60" />
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border border-[#484848] bg-[#050510] py-1 pl-9 pr-4 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-[#9c46eb]"
          />
          <button className="ml-2">
            <SlidersHorizontal className="h-5 w-5 text-white/70" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-[#484848]">
        {walletData.map((wallet) => (
          <div key={wallet.id} className="flex items-center justify-between p-2 sm:p-4 hover:bg-[#1a1a1a]">
            <div className="flex items-center gap-2 sm:gap-3">
              <Checkbox
                defaultChecked={selectedWallets.includes(wallet.id)}
                onChange={() => toggleWallet(wallet.id)}
                id={`wallet-${wallet.id}`}
                className="border border-[#9C46EB]"
              />
              <span className="text-sm sm:text-base text-white">{wallet.address}</span>
            </div>
            <button className="text-white/70 hover:text-white">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

