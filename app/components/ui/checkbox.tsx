type CheckboxProps = {
  label?: string;
  error?: string;
} 

const Checkbox = ({ label, error, ...props }: CheckboxProps) => {
  return (
    <div className="flex gap-10">
      <label>
        {label}
      </label>
      <input type='checkbox'{...props} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Checkbox;
