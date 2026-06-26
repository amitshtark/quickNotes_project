function saveNotes(notes) {
    const notesString = JSON.stringify(notes);
    localStorage.setItem("notes", notesString);
}

function loadNotes() {
    const notes = localStorage.getItem("notes");
    if(!notes) 
        return [];
    return (JSON.parse(notes));
}

export {saveNotes, loadNotes};