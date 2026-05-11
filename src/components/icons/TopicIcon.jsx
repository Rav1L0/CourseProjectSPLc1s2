export default function TopicIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M6 4.5h10a2 2 0 0 1 2 2V19.5a1.5 1.5 0 0 1-1.5 1.5H7.5A1.5 1.5 0 0 1 6 19.5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 8h7M8.5 11.5h7M8.5 15h4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  )
}

