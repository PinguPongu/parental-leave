import { InputHTMLAttributes } from 'react';

type RadioButtonInfo = {
  id: string,
  name: string;
  label?: string;
} 

type RadioButtonProps = {
  radioInfos: RadioButtonInfo[]
  title: string,
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const RadioButton = ({ radioInfos, error, title, ...props }: RadioButtonProps) => {
  const groupName = typeof props.name === 'string' ? props.name : undefined;
  
  return (
    <fieldset className="space-y-2">
      <div className="mb-1 text-sm font-semibold text-slate-700">{title}</div>
      <div className="space-y-2">
        {radioInfos.map((radioInfo) => {
          const id = `${groupName ?? radioInfo.name}-${radioInfo.id}`;

          return (
            <label key={radioInfo.id} htmlFor={id} className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition hover:border-slate-300 hover:bg-white">
              <input
                type="radio"
                name={groupName ?? radioInfo.name}
                value={radioInfo.id}
                id={id}
                className="h-4 w-4 border-slate-300 text-[var(--gov-navy-900)] focus:ring-[var(--gov-navy-700)]"
                {...props}
              />
              <span>{radioInfo.label ?? radioInfo.id}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-sm text-[var(--gov-danger-700)]">{error}</p>}
    </fieldset>
  );
};

export default RadioButton;
