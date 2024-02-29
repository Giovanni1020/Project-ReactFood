type ErrorType = {
  title: string;
  msg: string;
};

export default function Error({ title, msg }: ErrorType) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{msg}</p>
    </div>
  );
}
