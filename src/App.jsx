import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note'
import NoteModal from './components/noteModal'
import { saveNotes, loadNotes } from './utils/storage'



function App() {
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState('Personal');
  const [notes, setNotes] = useState(() => loadNotes());
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);



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

  function toggleCategory(category) {
  if (category === "All") {
    setSelectedCategories(["All"]);
    return;
  }

  let updatedCategories;

  if (selectedCategories.includes(category)) {
    updatedCategories = selectedCategories.filter((cat) => cat !== category);
  } else {
    updatedCategories = [
      ...selectedCategories.filter((cat) => cat !== "All"),
      category
    ];
  }

  if (updatedCategories.length === 0) {
    updatedCategories = ["All"];
  }

  setSelectedCategories(updatedCategories);
}



  const filteredNotes = notes.filter((note) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
    note.title?.toLowerCase().includes(search) ||
    note.text.toLowerCase().includes(search);

    const matchesCategory =
    selectedCategories.includes("All") ||
    selectedCategories.includes(note.category);

  return matchesSearch && matchesCategory;
  });


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


  <input
    id="search-input"
    placeholder="Search notes..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
  <div id="category-filters">
    <button
      className={selectedCategories.includes("All") ? "active" : ""}
      onClick={() => toggleCategory("All")}
    >
      All
    </button>

    <button
      className={selectedCategories.includes("Personal") ? "active" : ""}
      onClick={() => toggleCategory("Personal")}
    >
      Personal
    </button>

    <button
      className={selectedCategories.includes("Study") ? "active" : ""}
      onClick={() => toggleCategory("Study")}
    >
      Study
    </button>

    <button
      className={selectedCategories.includes("Work") ? "active" : ""}
      onClick={() => toggleCategory("Work")}
    >
      Work
    </button>
  </div>



  <div className='notes-grid'>
    {filteredNotes.map((note) => <Note key={note.id} note={note} deleteNote={deleteNote} setSelectedNote={setSelectedNote}/>)}

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
