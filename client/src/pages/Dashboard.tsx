import { useEffect, useState } from 'react';
import api from '../api';

type Note = {
  _id: string;
  title: string;
  body: string;
};


const CreateNoteModal = ({ onNoteCreated, onCancel }: { onNoteCreated: (note: Note) => void, onCancel: () => void }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await api.post('/notes', { title, body });
      onNoteCreated(res.data);
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create a new note</h2>
        <form onSubmit={handleAddNote} className="space-y-4">
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="input min-h-[120px]"
            placeholder="Write something..."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onCancel} className="btn">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Note</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [displayName, setDisplayName] = useState('User');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setDisplayName(payload.email || 'User');
    } catch (e) {
      console.error("Failed to decode token", e);
    }

    (async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (e: any) {
        if (e.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    })();
  }, []);

  const delNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (error) {
        console.error("Failed to delete note", error);
    }
  };

  const handleNoteCreated = (newNote: Note) => {
      setNotes(prev => [newNote, ...prev]);
      setShowCreateModal(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
     
      {showCreateModal && (
        <CreateNoteModal 
            onNoteCreated={handleNoteCreated} 
            onCancel={() => setShowCreateModal(false)}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <img src="/assets/top.png" alt="logo" className="w-8 h-8" />
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          
          <button onClick={logout} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 md:hidden">
              Sign Out
          </button>
          <button onClick={logout} className="hidden md:flex px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600">
              Logout
          </button>
        </header>

        <main className="p-4 md:p-6 max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="card mb-6 p-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome, {displayName.split('@')[0]}!</h2>
              <p className="text-gray-600">Email: {displayName}</p>
              <button 
                onClick={() => setShowCreateModal(true)} 
                className="btn btn-primary w-full md:w-auto mt-4 h-11"
              >
                Create Note
              </button>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 px-2">Your Notes</h3>
            {notes.length === 0 ? (
              <div className="text-center py-10 px-4 bg-white rounded-2xl shadow">
                <p className="text-gray-500">You don't have any notes yet.</p>
                <p className="text-gray-500">Click "Create Note" above to get started!</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow divide-y divide-gray-200">
                {notes.map(n => (
                  <div key={n._id} className="p-4 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-medium text-gray-800 truncate">{n.title}</h4>
                      {n.body && <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap break-words">{n.body}</p>}
                    </div>
                    <button onClick={() => delNote(n._id)} className="shrink-0 p-2 rounded-full hover:bg-gray-100">
                      <img src="/assets/delete_24dp.png" alt="delete" className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

