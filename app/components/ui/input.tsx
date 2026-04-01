import { InputHTMLAttributes } from 'react';

type InputProps = {
  label?: string;
  placeholder?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, type='text', placeholder, error, ...props }: InputProps) => {
  const fieldName = typeof props.name === 'string' ? props.name : undefined;
  const inputId = props.id ?? fieldName;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--gov-navy-700)] focus:ring-2 focus:ring-[color:rgba(37,85,138,.15)]"
        {...props}
      />
      {error && <p className="text-sm text-[var(--gov-danger-700)]">{error}</p>}
    </div>
  );
};

export default Input;
