export default function Button({ text }) {
  return (
    <button
      type="submit"
      style={{
        padding: "10px",
        backgroundColor: "#2e7d32",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
