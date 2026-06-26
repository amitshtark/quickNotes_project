function Note({note, deleteNote, setSelectedNote}){
    const date = new Date(note.createdAt).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short"
    });
    let updateDate = null;
    if(note.updatedAt)
    {
        updateDate = new Date(note.updatedAt).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short"
        });
    }

    return(
        <div className="note" onClick={() => setSelectedNote(note)}>
            <button onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id)
            }}
            >X</button>
            {note.title?.trim() && <h3>{note.title}</h3>}
            <p>{note.text}</p>
            <small>createdAt: {date} <br /> </small>
            {note.updatedAt && <small>updatedAt: {updateDate}</small>}

        </div>
    );

}

export default Note;
