const ICONS = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  phone: (
    <path
      d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  ),
  chat: (
    <path
      d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3 7 9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  cap: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  refresh: (
    <path
      d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  // Nhánh nguyệt quế cách điệu (lá kim cương dọc cành)
  laurel: (
    <>
      <path d="M6 24 Q75 8 144 24" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="19.2" y="17.2" width="5.6" height="5.6" transform="rotate(45 22 20)" fill="currentColor" />
      <rect x="33.2" y="13.2" width="5.6" height="5.6" transform="rotate(45 36 16)" fill="currentColor" />
      <rect x="48.2" y="11.2" width="5.6" height="5.6" transform="rotate(45 51 14)" fill="currentColor" />
      <rect x="63.2" y="11.2" width="5.6" height="5.6" transform="rotate(45 66 14)" fill="currentColor" />
      <rect x="78.2" y="13.2" width="5.6" height="5.6" transform="rotate(45 81 16)" fill="currentColor" />
      <rect x="92.2" y="17.2" width="5.6" height="5.6" transform="rotate(45 95 20)" fill="currentColor" />
      <circle cx="8" cy="24" r="1.2" fill="currentColor" />
      <circle cx="116" cy="24" r="1.2" fill="currentColor" />
      <circle cx="130" cy="24" r="1.2" fill="currentColor" />
    </>
  ),
  // Ngôi sao 4 cánh lấp lánh
  sparkle: (
    <path
      d="M12 2C13.2 7.6 16.4 10.8 22 12C16.4 13.2 13.2 16.4 12 22C10.8 16.4 7.6 13.2 2 12C7.6 10.8 10.8 7.6 12 2Z"
      fill="currentColor"
    />
  ),
}

export default function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name] || null}
    </svg>
  )
}
