import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple magnifying glass icon for inputs; inherits currentColor for theme.
 */
export default function SearchIcon(props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Search"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
