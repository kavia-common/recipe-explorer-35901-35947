import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader
 * Simple animated loader with Ocean Professional styling.
 * Props:
 *  - label?: string
 *  - inline?: boolean
 */
export default function Loader({ label = 'Loading…', inline = false }) {
  return (
    <div className={inline ? 'loader inline' : 'loader'}>
      <div className="spinner" aria-hidden="true" />
      <span className="loader-label">{label}</span>
    </div>
  );
}
