import { useState } from "react";
import api from "../services/api";

export default function BookmarkCard({ bookmark, onUpdate, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  //checking commit

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      setIsDeleting(true);
      try {
        await api.delete(`/bookmarks/${bookmark._id}`);
        onDelete(bookmark._id);
      } catch (err) {
        console.error("Error deleting bookmark:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-indigo-600 hover:text-indigo-800 mb-2"
          >
            {bookmark.title || "Untitled"}
          </a>
          <div className="flex space-x-2">
            <button
              onClick={onUpdate}
              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <p className="mt-1 text-sm text-gray-500 line-clamp-3">
          {bookmark.description}
        </p>

        {bookmark.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {new Date(bookmark.createdAt).toLocaleDateString()}
          </span>
          <button className="text-gray-400 hover:text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                bookmark.isFavorite
                  ? "text-yellow-400 fill-current"
                  : "text-gray-400"
              }`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={bookmark.isFavorite ? 0 : 2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
