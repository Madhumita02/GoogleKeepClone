import { state } from "./notesData.js";
import { saveNotes } from "./saveNotes.js";
import { renderNotes } from "./rendernotesui.js";
import { handleNoteClick } from "./handleNoteClick.js";

let timeoutId;
let activeNote;
let inputs;

export function openEditor(noteId) {

    const note = state.notes.find(n => n.id === Number(noteId));
    if (!note) return; //if the id isnt found etc and if its undefined

    note.isEditing = true;   
    saveNotes();

    activeNote = note;

    const overlay = document.getElementById("note_overlay");
    const modal = document.getElementById("edit_note_modal");

    modal.innerHTML = ""; //incase anythign is there from previous edits

    if (note.type === "text") {
        renderTextEditor(note);
    } else if (note.type === "checklist") {
        renderChecklistEditor(note);
    }

    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");

}

export function renderTextEditor(note) {
    const modal = document.getElementById("edit_note_modal");

    modal.innerHTML = `
        <input class="edit_title" value="${note.title}" placeholder="Title" />
        <input class="edit_description" value="${note.description}" placeholder="Description" />
        <textarea class="edit_content">${note.content}</textarea>
    `;

    const title = modal.querySelector(".edit_title");
    const description = modal.querySelector(".edit_description");
    const content = modal.querySelector(".edit_content");

    inputs = { title, description, content };

    noteEdits(note);
}

function noteEdits(note) {
    const editNote = document.getElementById("edit_note_modal");

    const title = editNote.querySelector(".edit_title");
    const description = editNote.querySelector(".edit_description");
    const content = editNote.querySelector(".edit_content");


    function autoSave() {
        if(timeoutId)
        clearTimeout(timeoutId);

        timeoutId = setTimeout(()=> {
            activeNote.title = title.value;
            activeNote.description = description.value;
            activeNote.content = content.value;

            saveNotes();

        }, 500)
    }

    title.addEventListener("input", autoSave);
    description.addEventListener("input", autoSave);
    content.addEventListener("input", autoSave);
}

export function finalSaveAndCleanUp() {
    
    if(!activeNote || !inputs) return;
    if(activeNote.type === "checklist") return;

    clearTimeout(timeoutId);

    const t = inputs.title.value.trim();
    const d = inputs.description.value.trim();
    const c = inputs.content.value.trim();

    activeNote.isEditing = false;

    if(!t && !d && !c) {
        state.notes = state.notes.filter(n => n.id !== activeNote.id);
    } else {
        activeNote.title = t;
        activeNote.description = d;
        activeNote.content = c;
    }

    saveNotes();
    renderNotes();   

    activeNote = null;
    inputs = null;
    timeoutId = null;
}

export function renderChecklistEditor(note) {
    alert("yet to work on!");
    
}