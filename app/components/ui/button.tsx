type ButtonProps = {
  type?: "button" | "submit" | "reset",
  variant: "primary" | "secondary",
  label: string
};

const Button = ({ type = "submit", label, variant }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = variant === 'primary'
    ? "bg-[var(--gov-navy-900)] text-white hover:bg-[var(--gov-navy-950)] focus:ring-[var(--gov-navy-700)]"
    : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 focus:ring-slate-400";

  return (
    <div className="pt-3">
      <button type={type} className={`${baseClasses} ${variantClasses}`}>
        {label}
      </button>
    </div>
  );
};

export default Button;
