import { useState } from "react";
import Modal from "react-modal";

function NoteModal({selectedNote, closeModal, updateNote})
{
    if(!selectedNote)
        return null;

    const [currentTitle, setCurrentTitle] = useState(selectedNote.title);
    const [currentText, setCurrentText] = useState(selectedNote.text);

    const date = new Date(selectedNote.createdAt).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short"
    });
    function handleUpdate(){
        if(currentText.trim() !== "")
        {
            updateNote(selectedNote.id, currentTitle, currentText);
            closeModal();
        }
    }

    return(
    <Modal isOpen = {true} onRequestClose={closeModal} className="note-modal" overlayClassName="note-modal-overlay">
        <button onClick={closeModal}>X</button>
        <input id="titleInput" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)}/>
        <textarea id="textInput" value={currentText} onChange={(e) => setCurrentText(e.target.value)} />
        <button id="updateNoteBtn" onClick={handleUpdate}>Update</button>
    </Modal>
    )
}

export default NoteModal;