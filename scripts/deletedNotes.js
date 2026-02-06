import { state } from "./notesData.js";
import { saveNotes } from "./saveNotes.js";
import { renderNotes } from "./rendernotesui.js";
import { getNoteOrder } from "./createNewNotesArray.js";

export function TemporaryDeleteNote(noteId){
    
    const note = state.notes.find(n => n.id === Number(noteId));

    console.log(note);
    if(!note) return;

    note.isDeleted = true;
    note.isPinned = false;
    note.pinOrder = null;


    console.log("temporarily deleted.");

}


export function restoreNote(noteId) {
    
    const note = state.notes.find(n => n.id === Number(noteId));

    console.log(note);
    if(!note) return;

    note.isDeleted = false;
    note.order = getNoteOrder();

    console.log("restored note.");

}

export function requestPermanentDelete(noteId) {

    const confirmed = confirm("Delete this note permanently?");

    if (!confirmed) return;

    permanentlyDeleteNote(noteId);
    saveNotes();
    renderNotes();

    console.log("deleted permanently");

}

export function permanentlyDeleteNote(noteId) {

    const index = state.notes.findIndex(n => n.id === Number(noteId));
    if(index === -1) return;
    
    state.notes.splice(index, 1);

}

