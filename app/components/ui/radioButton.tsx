type RadioProps = {
  id: string,
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
} 

const RadioButton = ({ label, placeholder, error, ...props }: RadioProps) => {
  return (
    <div className="flex gap-10">
      <label>
        {label}
      </label>
      <input type="radio" placeholder={placeholder} {...props} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default RadioButton;
