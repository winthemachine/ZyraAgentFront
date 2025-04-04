import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm hidden sm:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
      <input
        type="search"
        placeholder="Search by wallet, exchange, token, ENS..."
        className="w-full rounded-full border border-[#484848] bg-[#050510] py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-[#9c46eb]"
      />
    </div>
  )
}

