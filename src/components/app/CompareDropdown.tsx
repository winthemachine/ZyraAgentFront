import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CompareOption {
  id: string;
  name: string;
}

interface CompareDropdownProps {
  options?: CompareOption[];
  onSelect?: (option: CompareOption) => void;
}

const defaultOptions: CompareOption[] = [
  { id: "btc", name: "Bitcoin (BTC)" },
  { id: "sol", name: "Solana (SOL)" },
  { id: "usdt", name: "Tether (USDT)" },
  { id: "bnb", name: "Binance Coin (BNB)" },
  { id: "ada", name: "Cardano (ADA)" },
];

const CompareDropdown = ({
  options = defaultOptions,
  onSelect,
}: CompareDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CompareOption | null>(null);

  const handleSelect = (option: CompareOption) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border self-stretch w-36 flex lg:min-w-60 min-h-8 items-center text-sm text-[rgba(135,133,133,1)] justify-between lg:w-[251px] px-2 lg:px-4 py-1.5 lg:py-2.5 rounded-[10px] border-[rgba(72,72,72,1)] border-solid"
      >
        <span className="text-xs lg:text-sm">{selected ? selected.name : "Compare with"}</span>
        <ChevronDown className="lg:w-6 w-4 lg:h-6 h-4 text-[rgba(135,133,133,1)]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-[rgba(15,15,25,1)] border border-[rgba(72,72,72,1)] rounded-[10px] z-10">
          <ul className="py-2">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 text-sm text-[rgba(135,133,133,1)] hover:bg-[rgba(30,30,40,1)] hover:text-white"
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompareDropdown;