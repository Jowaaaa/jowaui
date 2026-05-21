import React from "react";
import "./fileinput.css";

export interface FileInputProps {
  label?: string;
  error?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (files: FileList | null) => void;
  className?: string;
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
