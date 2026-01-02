export const MailIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" />
    <path d="M4 6l8 7 8-7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const LockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const EyeIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const EyeOffIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" />
    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.82 21.82 0 015.06-5.94"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ErrorIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" />
  </svg>
);
