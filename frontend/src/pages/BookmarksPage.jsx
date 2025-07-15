import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkCard from '../components/BookmarkCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const params = {};
        if (searchTerm) params.q = searchTerm;
        if (selectedTags.length) params.tags = selectedTags.join(',');
        
        const { data } = await api.get('/bookmarks', { params });
        setBookmarks(data);
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [searchTerm, selectedTags]);

  const handleCreate = () => navigate('/bookmarks/new');

  const allTags = [...new Set(bookmarks.flatMap(bookmark => bookmark.tags))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            + New Bookmark
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div>
            <TagFilter 
              tags={allTags} 
              selectedTags={selectedTags} 
              onChange={setSelectedTags} 
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookmarks found. Create your first bookmark!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map(bookmark => (
              <BookmarkCard 
                key={bookmark._id} 
                bookmark={bookmark} 
                onUpdate={() => navigate(`/bookmarks/${bookmark._id}/edit`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookmarksPage;