const container = document.getElementById("notes");
const addButton = document.querySelector("#add_note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    container.appendChild(noteElement);
});

addButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("notes") || "[]")
}

function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty note";

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you wish to delete this note?");
        if (doDelete) {
          deleteNote(id, element);
        }
    });

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    container.appendChild(noteElement);
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id,element){
    const notes = getNotes().filter((note) => note.id != id);
    saveNotes(notes);
    container.removeChild(element);
}