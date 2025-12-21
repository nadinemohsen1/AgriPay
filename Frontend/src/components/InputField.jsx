export default function InputField({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  );
}
