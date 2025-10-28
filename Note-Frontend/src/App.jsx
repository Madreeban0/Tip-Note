import React, { useState, useEffect } from 'react';
// <-- Removed CSS imports that were causing compilation errors

// --- Icon Components (Simple SVGs) ---

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const BackIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M19 12H5"></path>
     <path d="M12 19l-7-7 7-7"></path>
   </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// --- 1. Sidebar Component ---
function Sidebar({ page, onSetPage, onCreateNew, onToggleDarkMode, isDarkMode }) {
  const navItemClasses = "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200";
  const activeClasses = "bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-white font-medium";
  const inactiveClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div className="w-64 h-screen flex flex-col p-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-8">
        Tipnote
      </h1>

      <button
        onClick={onCreateNew}
        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mb-6"
      >
        <PlusIcon />
        New Note
      </button>

      <nav className="flex flex-col gap-2">
        <div
          onClick={() => onSetPage('dashboard')}
          className={`${navItemClasses} ${page === 'dashboard' ? activeClasses : inactiveClasses}`}
        >
          <HomeIcon />
          <span>Home</span>
        </div>
        <div
          onClick={() => onSetPage('pinned')}
          className={`${navItemClasses} ${page === 'pinned' ? activeClasses : inactiveClasses}`}
        >
          <PinIcon />
          <span>Pinned Notes</span>
        </div>
      </nav>

      <div className="mt-auto">
        <button
          onClick={onToggleDarkMode}
          className="flex items-center gap-3 w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}


// --- 2. Dashboard Component ---
// Shows all note titles
function Dashboard({ notes, onEdit, onDelete, loading }) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Your Notes
      </h2>
      {loading && <p className="text-gray-600 dark:text-gray-400">Loading notes...</p>}
      {!loading && notes.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">You have no notes. Create one!</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between h-full transition-shadow duration-200 hover:shadow-xl"
          >
            <h3 className="text-xl font-medium text-purple-700 dark:text-purple-300 mb-4">
              {note.title}
            </h3>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => onEdit(note)}
                className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 3. Pinned Notes Component ---
// Placeholder - currently just shows all notes
// To make this real, your backend Note model needs a `pinned` boolean field
function PinnedNotes({ notes, onEdit, onDelete, loading }) {
  
  // In a real app, you would filter notes:
  // const pinnedNotes = notes.filter(note => note.pinned);
  // For now, we'll just show all notes as a placeholder.

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Pinned Notes
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        (Displaying all notes for now. Pinning functionality requires a backend update.)
      </p>
      {loading && <p className="text-gray-600 dark:text-gray-400">Loading notes...</p>}
      {!loading && notes.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">You have no notes.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between h-full transition-shadow duration-200 hover:shadow-xl"
          >
            <h3 className="text-xl font-medium text-purple-700 dark:text-purple-300 mb-4">
              {note.title}
            </h3>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => onEdit(note)}
                className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg text-sm transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// --- 4. Note Editor Component ---
// Form for creating/editing a note
function NoteEditor({ note, onSave, onBack }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...note,
      title,
      content,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <BackIcon />
          Back to Dashboard
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {note?.id ? 'Edit Note' : 'Create New Note'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows="10"
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
}

// --- 5. Main App Component ---
// Manages state and API calls
function App() {
  // --- State ---
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState('dashboard'); // 'dashboard', 'pinned', 'noteEditor'
  const [currentNote, setCurrentNote] = useState(null); // The note being edited
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:8080/api';

  // --- Dark Mode Effect ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- API Functions ---

  // 1. Fetch all notes (GET)
  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/notes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(data);
    } catch (e) {
      setError('Failed to fetch notes.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchNotes() once on load
  useEffect(() => {
    fetchNotes();
  }, []);

  // 2. Save Note (CREATE or UPDATE)
  const handleSaveNote = async (note) => {
    const isUpdating = !!note.id;
    const method = isUpdating ? 'PUT' : 'POST';
    const url = isUpdating ? `${API_URL}/notes/${note.id}` : `${API_URL}/notes`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, content: note.content }),
      });
      if (!response.ok) {
        throw new Error('Failed to save note.');
      }
      // After save, go back to dashboard and refresh
      handleGoToDashboard();
      await fetchNotes();
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  // 3. Delete Note (DELETE)
  const handleDeleteNote = async (id) => {
    // Re-adding the confirm dialog as it's good practice
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note.');
      }
      await fetchNotes(); // Refresh the notes list
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  // --- Navigation Functions ---
  const handleGoToDashboard = () => {
    setPage('dashboard');
    setCurrentNote(null);
    setError('');
  };

  const handleGoToEditor = (note) => {
    setCurrentNote(note); // 'note' is the full note object, or null for a new note
    setPage('noteEditor');
    setError('');
  };

  const handleSetPage = (pageName) => {
    if (pageName === 'dashboard') {
      handleGoToDashboard();
    } else if (pageName === 'pinned') {
      setPage('pinned');
      setCurrentNote(null);
      setError('');
    }
  };

  // --- Render ---
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- Sidebar --- */}
      <Sidebar
        page={page}
        onSetPage={handleSetPage}
        onCreateNew={() => handleGoToEditor(null)}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />

      {/* --- Main Content Area --- */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* --- Error Display --- */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6" role="alert">
            <span className="font-bold">Error:</span>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* --- Page Content --- */}
        <main>
          {page === 'dashboard' && (
            <Dashboard
              notes={notes}
              loading={loading}
              onEdit={handleGoToEditor}
              onDelete={handleDeleteNote}
            />
          )}
          {page === 'pinned' && (
            <PinnedNotes
              notes={notes}
              loading={loading}
              onEdit={handleGoToEditor}
              onDelete={handleDeleteNote}
            />
          )}
          {page === 'noteEditor' && (
            <NoteEditor
              note={currentNote}
              onSave={handleSaveNote}
              onBack={handleGoToDashboard}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;



