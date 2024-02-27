type InputProps = {
  id: string;
  label: string;
  type?: string;
};

export default function Input({ id, label, type }: InputProps) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required type={type} />
    </p>
  );
}
