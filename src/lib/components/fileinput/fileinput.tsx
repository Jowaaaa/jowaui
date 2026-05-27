import React from "react";

export interface FileInputProps {
  /** Visible label rendered above the file trigger */
  label?: string;
  /** Validation error message; applies error styling */
  error?: string;
  /** Helper text shown below the control when there is no error */
  hint?: string;
  /** Accepted file types passed to the native input (e.g. "image/*,.pdf") */
  accept?: string;
  /** Allows selecting multiple files when true (default: false) */
  multiple?: boolean;
  /** Disables the control when true (default: false) */
  disabled?: boolean;
  /** Callback fired with the selected FileList (or null) on change */
  onChange?: (files: FileList | null) => void;
  /** Additional CSS class applied to the trigger element */
  className?: string;
  /** HTML id for the hidden file input; auto-derived from label when omitted */
  id?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  error,
  hint,
  accept,
  multiple = false,
  disabled = false,
  onChange,
  className = "",
  id,
}) => {
  const [fileNames, setFileNames] = React.useState<string>("No file chosen");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : "jowa-fileinput");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const names = Array.from(files)
        .map((f) => f.name)
        .join(", ");
      setFileNames(names);
    } else {
      setFileNames("No file chosen");
    }
    onChange?.(files);
  };

  const handleTriggerClick = (): void => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) inputRef.current?.click();
    }
  };

  const triggerClasses = [
    "jowa-fileinput-trigger",
    disabled ? "jowa-fileinput-trigger--disabled" : "",
    error ? "jowa-fileinput-trigger--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="jowa-fileinput-wrapper">
      {label && (
        <label htmlFor={inputId} className="jowa-fileinput-label">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "none" }}
      />
      <div
        className={triggerClasses}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={label ? `${label}: ${fileNames}` : fileNames}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
      >
        <span className="jowa-fileinput-btn" aria-hidden="true">
          Choose file{multiple ? "s" : ""}
        </span>
        <span className="jowa-fileinput-filename">{fileNames}</span>
      </div>
      {error && <p className="jowa-fileinput-error">{error}</p>}
      {!error && hint && <p className="jowa-fileinput-hint">{hint}</p>}
    </div>
  );
};

FileInput.displayName = "FileInput";
