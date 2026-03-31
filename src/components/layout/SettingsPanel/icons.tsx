const IconNotif = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M8 2a4.5 4.5 0 0 0-4.5 4.5c0 2.5-1 3.5-1 3.5h11s-1-1-1-3.5A4.5 4.5 0 0 0 8 2Z"/>
    <path d="M9.3 13a1.5 1.5 0 0 1-2.6 0"/>
  </svg>
);

const IconTheme = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <circle cx="8" cy="8" r="3"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>
  </svg>
);

const IconPrivacy = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M8 1L2 4v4c0 3.3 2.5 5.7 6 6.5C11.5 13.7 14 11.3 14 8V4L8 1Z"/>
  </svg>
);

const IconStorage = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <ellipse cx="8" cy="5" rx="6" ry="2.5"/>
    <path d="M2 5v3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5"/>
    <path d="M2 8v3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V8"/>
  </svg>
);

const IconBlock = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <circle cx="8" cy="8" r="6"/>
    <line x1="3.8" y1="3.8" x2="12.2" y2="12.2"/>
  </svg>
);

const IconReport = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M8 2L2 13h12L8 2Z"/>
    <line x1="8" y1="7" x2="8" y2="10"/>
    <circle cx="8" cy="12" r="0.5" fill="currentColor"/>
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>
    <path d="M11 11l3-3-3-3"/>
    <line x1="14" y1="8" x2="6" y2="8"/>
  </svg>
);

const IconChevron = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}>
    <path d="M6 4l4 4-4 4"/>
  </svg>
);


const IconClose = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" width="14" height="14">
    <line x1="4" y1="4" x2="12" y2="12"/>
    <line x1="12" y1="4" x2="4" y2="12"/>
  </svg>
);
export { IconNotif, IconTheme, IconStorage, IconPrivacy, IconBlock, IconReport, IconLogout, IconChevron, IconClose }