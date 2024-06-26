import React from "react";

const TextArea: React.FC<{
  id?: string;
  rows?: number;
  labelText?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: any;
  error?: string;
  name?: string;
  disabled?: boolean;
}> = ({
  id,
  rows = 4,
  labelText = "Label",
  placeholder = "Placeholder",
  className = "",
  value,
  onChange,
                          name,
    disabled = false,
  error = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-base font-normal text-dark"
      >
        {labelText}
      </label>
      <textarea 
        id={id}
        rows={rows}
        name={name}
        className="block p-2.5 w-full text-sm text-primaryText bg-white-50 rounded-md border border-stroke focus:outline-none focus:ring-1"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value? e.target.value : value)}
      />
      <span className="text-danger text-sm">{error}</span>
    </div>
  );
};

export default TextArea;
