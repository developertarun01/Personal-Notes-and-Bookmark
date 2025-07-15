import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import NotesPage from './pages/NotesPage';
import BookmarksPage from './pages/BookmarksPage';
import AuthPage from './pages/AuthPage';
import NoteFormPage from './pages/NoteFormPage';
import BookmarkFormPage from './pages/BookmarkFormPage';
import PrivateRoute from './components/PrivateRoute';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/register" element={<AuthPage type="register" />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<NotesPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/notes/new" element={<NoteFormPage />} />
                <Route path="/notes/:id/edit" element={<NoteFormPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/bookmarks/new" element={<BookmarkFormPage />} />
                <Route path="/bookmarks/:id/edit" element={<BookmarkFormPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;