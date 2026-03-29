type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
} 

const Input = ({ label, type = "text", placeholder, error, ...props }: InputProps) => {
  return (
    <div className="flex gap-10">
      <label>
        {label}
      </label>
      <input type={type} placeholder={placeholder} {...props} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
