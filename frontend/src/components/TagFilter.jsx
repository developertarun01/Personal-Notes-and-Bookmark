export default function TagFilter({ tags, selectedTags, onChange }) {
  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  return (
    <div className="flex flex-wrap m-2 gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-2 py-1 text-xs rounded-full ${
            selectedTags.includes(tag)
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
