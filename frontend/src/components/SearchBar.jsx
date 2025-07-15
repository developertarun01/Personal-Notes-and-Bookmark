export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}