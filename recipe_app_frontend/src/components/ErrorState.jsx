import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ErrorState
 * Presents an error message with optional retry action.
 * Props:
 *  - title?: string
 *  - message?: string
 *  - onRetry?: function
 */
export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-illustration" aria-hidden="true">⚠️</div>
      <h2 className="h2">{title}</h2>
      {message ? <p className="muted">{message}</p> : null}
      {onRetry ? (
        <button className="btn btn-primary mt-3" type="button" onClick={onRetry} aria-label="Retry">
          Retry
        </button>
      ) : null}
    </div>
  );
}
