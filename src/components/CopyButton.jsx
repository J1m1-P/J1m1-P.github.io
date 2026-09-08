import { useState } from "react";

const CopyButton = ({ value, label }) => {
  const [status, setStatus] = useState("idle");

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  const buttonText =
    status === "copied" ? "Copied" : status === "error" ? "Try again" : "Copy";

  return (
    <button
      className="contact-copy-button"
      type="button"
      onClick={copyValue}
      aria-label={`${buttonText} ${label}`}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        {status === "copied" ? (
          <path d="m4 10 3.5 3.5L16 5" />
        ) : (
          <path d="M7 6V3h10v10h-3M3 7h10v10H3V7Z" />
        )}
      </svg>
      <span aria-live="polite">{buttonText}</span>
    </button>
  );
};

export default CopyButton;
