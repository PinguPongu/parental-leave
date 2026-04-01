import { InputHTMLAttributes } from 'react';

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const DatePicker = ({ label, error, ...props }: InputProps) => {
  const fieldName = typeof props.name === 'string' ? props.name : undefined;
  const datePickerId = props.id ?? fieldName;

  return (
    <div className="space-y-1.5">
      <label htmlFor={datePickerId} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={datePickerId}
        type='date'
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--gov-navy-700)] focus:ring-2 focus:ring-[color:rgba(37,85,138,.15)]"
        {...props}
      />
      {error && <p className="text-sm text-[var(--gov-danger-700)]">{error}</p>}
    </div>
  );
};

export default DatePicker;
