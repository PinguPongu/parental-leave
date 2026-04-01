type InputProps = {
  label?: string;
  error?: string;
} 

const DatePicker = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex gap-10">
      <label>
        {label}
      </label>
      <input type='date'{...props} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default DatePicker;
