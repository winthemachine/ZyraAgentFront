interface CryptoOverviewProps {
    name: string;
    symbol: string;
    price: string;
    priceChange: string;
    timeframe: string;
    circulatingSupply: string;
    marketCap: string;
    timestamp: string;
    icon: React.ReactNode
}

const CryptoOverview = ({
    name,
    symbol,
    price,
    priceChange,
    timeframe,
    circulatingSupply,
    marketCap,
    timestamp,
    icon
}: CryptoOverviewProps) => {
    return (
        <div className="flex lg:w-[536px] max-w-full gap-4 lg:gap-[40px_51px] font-normal justify-between">
            <div className="flex items-start gap-2 w-fit">
                {icon} 
                <div className="flex flex-col -mt-1.5 items-stretch grow shrink-0 basis-0 w-fit">
                    <h1 className="text-white text-base lg:text-2xl">
                        {name} ({symbol})
                    </h1>
                    <div className="flex items-stretch gap-1 lg:gap-3.5">
                        <div className="text-white text-[13px] lg:text-[32px] grow">{price}</div>
                        <div className="text-[rgba(66,213,120,1)] text-[8px] lg:text-base grow shrink lg:w-[92px] my-auto whitespace-nowrap">
                            {priceChange} ({timeframe})
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col text-xs whitespace-nowrap lg:text-base text-white">
                <div>Circulating Supply: {circulatingSupply}</div>
                <div className="mt-1.5">Market Cap: {marketCap}</div>
                <div className="text-[rgba(169,168,168,1)] mt-1.5">{timestamp}</div>
            </div>
        </div>
    );
};

export default CryptoOverview;  