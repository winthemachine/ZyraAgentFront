export function EthereumIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#3676ef" />
            <path d="M12 4.5L12 9.75L16.5 12L12 4.5Z" fill="white" fillOpacity="0.6" />
            <path d="M12 4.5L7.5 12L12 9.75L12 4.5Z" fill="white" />
            <path d="M12 16.5L12 19.5L16.5 13.5L12 16.5Z" fill="white" fillOpacity="0.6" />
            <path d="M12 19.5L12 16.5L7.5 13.5L12 19.5Z" fill="white" />
            <path d="M12 15.75L16.5 12L12 9.75L12 15.75Z" fill="white" fillOpacity="0.2" />
            <path d="M7.5 12L12 15.75L12 9.75L7.5 12Z" fill="white" fillOpacity="0.6" />
        </svg>
    )
}

export function BitcoinIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#f7931a" />
            <path
                d="M16 10.5C16 8.567 14.433 7 12.5 7H9V10.5H8V12H9V13.5H8V15H9V17H10.5V15H13V17H14.5V15H16V13.5H14.5C15.328 13.5 16 12.828 16 12V10.5ZM10.5 8.5H12.5C13.605 8.5 14.5 9.395 14.5 10.5C14.5 11.605 13.605 12.5 12.5 12.5H10.5V8.5ZM13 13.5H10.5V15.5H13C14.105 15.5 15 14.605 15 13.5C15 13.5 14.105 13.5 13 13.5Z"
                fill="white"
            />
        </svg>
    )
}

export function UsdtIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#3676ef" />
            <path d="M12 5L12 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 9H7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 17H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export function SolanaIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#26a17b" />
            <path d="M8 10H16L14 12H6L8 10Z" fill="white" />
            <path d="M8 14H16L14 16H6L8 14Z" fill="white" />
            <path d="M14 8L16 6H8L6 8H14Z" fill="white" />
        </svg>
    )
}