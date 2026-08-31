import type { CategoryId } from "@/lib/types";

const shared = {
  viewBox: "0 0 24 24",
} as const;

export function CategoryIcon({
  id,
  className,
}: {
  id: CategoryId;
  className?: string;
}) {
  switch (id) {
    case "meat":
      return (
        <svg {...shared} className={className} aria-hidden="true">
          <path
            d="M4 9.3C4 5.8 7.3 3 11.4 3c4.5 0 8.6 2.9 8.6 6.9 0 4.1-4.1 8.1-9 8.1C6.4 18 4 13.9 4 9.3z"
            fill="currentColor"
          />
          <path
            d="M7.3 8.6c1.5-1.1 3.1-1.4 4.7-.8M8.2 12.2c1.9-.6 3.7-.5 5.4.4M12.9 6.7c1.7.1 3.1.9 4.1 2"
            stroke="var(--color-cream)"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "seafood":
      return (
        <svg {...shared} className={className} aria-hidden="true">
          <path
            d="M3 12c3.6-3.7 7.8-5.5 11.6-5.5 2.7 0 5 1.4 6.8 3.3-1 .6-1.9 1.4-2.5 2.2.6.8 1.5 1.6 2.5 2.2-1.8 1.9-4.1 3.3-6.8 3.3C10.8 17.5 5.6 15.6 3 12z"
            fill="currentColor"
          />
          <circle cx="8" cy="10.7" r="0.9" fill="var(--color-cream)" />
          <path
            d="M14.6 8.4l2.8-2.3M14.6 8.4l1.3-3.2M14.6 15.6l2.8 2.3M14.6 15.6l1.3 3.2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "eggTofu":
      return (
        <svg {...shared} className={className} aria-hidden="true">
          <rect x="3" y="10.5" width="7.5" height="7.5" rx="1.4" fill="currentColor" opacity="0.5" />
          <ellipse cx="15.2" cy="12" rx="6" ry="7.3" fill="currentColor" />
        </svg>
      );
    case "carb":
      return (
        <svg {...shared} className={className} aria-hidden="true">
          <path d="M4 12.2h16c-.2 4.4-3.8 6.8-8 6.8s-7.8-2.4-8-6.8z" fill="currentColor" />
          <path d="M4 12.2c0-1 1-1.8 2.1-1.8h11.8c1.1 0 2.1.8 2.1 1.8" fill="currentColor" opacity="0.6" />
          <path
            d="M9 6.2c-.6.9-.6 1.7 0 2.5M12 5c-.6.9-.6 1.7 0 2.5M15 6.2c-.6.9-.6 1.7 0 2.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "vegetable":
      return (
        <svg {...shared} className={className} aria-hidden="true">
          <path
            d="M19.5 4.5c-8.3 0-14.5 5.3-14.5 12.4 0 .6.1 1.2.2 1.8C13.8 18.3 19.5 12.4 19.5 4.5z"
            fill="currentColor"
          />
          <path
            d="M6.2 18.2c3-4.2 7.1-8.3 12.1-11.4"
            stroke="var(--color-cream)"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "fruit":
      return (
        <svg {...shared} className={className} aria-hidden="true">
          <path
            d="M12 8.5c-1-1.4-2.7-2.1-4.4-1.8C5.5 7 4 8.9 4 11.5c0 4 3.6 8.6 8 8.6s8-4.6 8-8.6c0-2.6-1.6-4.5-3.7-4.8-1.7-.3-3.4.4-4.3 1.8z"
            fill="currentColor"
          />
          <path d="M12 8.5V6.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path
            d="M12.2 6.3c.6-1.3 2-2 3.2-1.9"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    default:
      return null;
  }
}
