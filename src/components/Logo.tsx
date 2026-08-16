import { Link } from "react-router-dom";

function RobotI({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 52"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="14" cy="4" r="3" fill="#7EB6FF" />
      <rect x="12.5" y="6" width="3" height="6" rx="1.5" fill="#141820" />
      <circle cx="14" cy="20" r="9" fill="#1D6FFF" />
      <circle cx="11" cy="19" r="2.1" fill="#F7F8FB" />
      <circle cx="17" cy="19" r="2.1" fill="#F7F8FB" />
      <circle cx="11.3" cy="19.3" r="1" fill="#141820" />
      <circle cx="17.3" cy="19.3" r="1" fill="#141820" />
      <rect x="8" y="29" width="12" height="14" rx="3" fill="#1D6FFF" />
      <rect x="9.5" y="31" width="9" height="7" rx="2" fill="#EDE6D8" />
      <rect x="6" y="32" width="3.2" height="7" rx="1.4" fill="#1D6FFF" />
      <rect x="18.8" y="32" width="3.2" height="7" rx="1.4" fill="#1D6FFF" />
      <rect x="10" y="43" width="3.2" height="7" rx="1.4" fill="#1D6FFF" />
      <rect x="14.8" y="43" width="3.2" height="7" rx="1.4" fill="#1D6FFF" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-end gap-0 text-ink ${className}`}
      aria-label="OmniCrew"
    >
      <span className="text-[1.4rem] font-extrabold leading-none tracking-[-0.04em]">
        Omn
      </span>
      <RobotI className="-mx-0.5 mb-0 h-[1.7rem] w-[0.95rem]" />
      <span className="text-[1.4rem] font-extrabold leading-none tracking-[-0.04em]">
        Crew
      </span>
    </Link>
  );
}
