import { state } from "./notesData.js";
import { saveNotes } from "./saveNotes.js";
import { renderNotes } from "./renderNotesUi.js";
import { getNoteOrder } from "./createNewNotesArray.js";
import { updateNoteOnServer, deleteNoteFromServer } from "./serverSync.js";

export function TemporaryDeleteNote(noteId){
    console.log(noteId)
    const note = state.notes.find(n => String(n.id) === String(noteId));

    console.log(note);
    if(!note) return;

    note.isDeleted = true;
    note.isPinned = false;
    note.pinOrder = null;


    console.log("temporarily deleted.");

}


export function restoreNote(noteId) {
    
    const note = state.notes.find(n => String(n.id) === String(noteId));

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
    deleteNoteFromServer(noteId);
    renderNotes();

    console.log("deleted permanently");

}

export function permanentlyDeleteNote(noteId) {

    const index = state.notes.findIndex(n => String(n.id) === String(noteId));
    if(index === -1) return;
    
    state.notes.splice(index, 1);

}

