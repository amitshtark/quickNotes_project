import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note'
import NoteModal from './components/noteModal'
import { saveNotes, loadNotes } from './utils/storage'



function App() {
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState('Personal')
  const [notes, setNotes] = useState(() => loadNotes());
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);



  useEffect(() => {
  saveNotes(notes);
  }, [notes]);


  function addNote(){
    if(noteText.trim() !== "")
    {
      const now = Date.now();
      const newNote = 
    {
      id: now,
      category: noteCategory,
      title: noteTitle,
      text: noteText,
      createdAt: now
    }
      setNotes([...notes, newNote]);
      setNoteText('');
      setNoteTitle('');
      setNoteCategory('Personal')
    }
  }


  function updateNote(id, updatedTitle, updatedText, updatedCategory) {
  setNotes(
    notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,

          title: updatedTitle,

          text: updatedText,

          category: updatedCategory,

          updatedAt: Date.now()
        };
      }
      return note;
    })
  );
  }

  function deleteNote(id){
    const confirmDelete = confirm("Are you sure you want to delete this note")
    if(confirmDelete)
    {
      setNotes(notes.filter((note) => note.id !== id))
    }
  }
  return(
    <>
  <div id='input-area'>

  <select id="select-category" value={noteCategory} onChange={(e) => setNoteCategory(e.target.value)}>
    <option value="Personal" >Personal</option>
    <option value="Study" >Study</option>
    <option value="Work" >Work</option>
  </select>


  <input id='title' placeholder='Title' value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}/>
  <textarea value={noteText} onChange={(e) =>setNoteText(e.target.value)}/>
  <button onClick={addNote}>Add</button>
  </div>

  <div className='notes-grid'>
    {notes.map((note) => <Note key={note.id} note={note} deleteNote={deleteNote} setSelectedNote={setSelectedNote}/>)}

  <NoteModal
    selectedNote={selectedNote}
    closeModal={() => setSelectedNote(null)}
    updateNote={updateNote}
  />

  </div>
  </>
  )
}

export default App
