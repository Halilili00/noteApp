const container = document.querySelector("#notes");
const addButton = document.querySelector("#add_note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content, note.createDay);
    container.appendChild(noteElement);
});

addButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("notes") || "[]")
}

function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, content, day){
    const element = document.createElement("div");
    element.classList.add("note-container");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("delete");
    const textarea = document.createElement("textarea");
    textarea.classList.add("note");
    textarea.value = content;
    textarea.placeholder = "Empty note";
    const date = document.createElement("p");
    element.appendChild(textarea);
    element.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        const doDelete = confirm("Are you sure you wish to delete this note?");
        if (doDelete) {
          deleteNote(id, element);
        }
    });

    textarea.addEventListener("change", () => {
        updateNote(id, textarea.value);
        alert("Note updated!")
    });

    element.addEventListener("mouseover", () => {
        date.innerText = "Created: " + day;
        element.appendChild(date)
    })

    element.addEventListener("mouseout", () => {
        element.removeChild(date);
    })
    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: createId(),
        content: "",
        createDay: new Date().toLocaleString()
    };
    
    const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.createDay);
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

function createId(){
    let note = getNotes();
    let id;
    if(note.length == 0){
        id = 0;
    } else{
        id = note[note.length-1].id+1;
    }
    return id;
}