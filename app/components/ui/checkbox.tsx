import { InputHTMLAttributes } from 'react';

type CheckboxProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ label, error, ...props }: CheckboxProps) => {
  const fieldName = typeof props.name === 'string' ? props.name : undefined;
  const checkboxId = props.id ?? fieldName;

  return (
    <div className="space-y-1.5">
      <label htmlFor={checkboxId} className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-800">
        <input
          id={checkboxId}
          type='checkbox'
          className="h-4 w-4 rounded border-slate-300 text-[var(--gov-navy-900)] focus:ring-[var(--gov-navy-700)]"
          {...props}
        />
        {label}
      </label>
      {error && <p className="text-sm text-[var(--gov-danger-700)]">{error}</p>}
    </div>
  );
};

export default Checkbox;
