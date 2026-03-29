type ButtonProps = {
  type?: "button" | "submit" | "reset",
  variant: "primary" | "secondary",
  label: string
};

const Button = ({ type = "submit", label }: ButtonProps) => {
  return (
    <div className="flex gap-10">
      <button type={type}>{label}</button>
    </div>
  );
};

export default Button;
