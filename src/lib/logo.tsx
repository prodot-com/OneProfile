
function Logo({className= "", ...props}) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            transform="rotate(45 12 12)"
        />
        </svg>
    );
}

export default Logo;