
import { TemporaryDeleteNote, restoreNote, requestPermanentDelete } from "./deletedNotes.js";
import { isTrash } from "./htmlElements.js";
import { saveNotes } from "./saveNotes.js";
import { renderNotes } from "./renderNotesUi.js";
import { state } from "./notesData.js";
import { openEditor } from "./editNote.js";
import { updateNoteOnServer } from "./serverSync.js";

export function handleNoteClick(e){
    const noteClicked = e.target.closest(".note_card");
    if(!noteClicked ) return;

    const noteId = noteClicked.dataset.id;

    if(e.target.closest(".pin_note")) {
        e.stopPropagation();

        const note = state.notes.find(n => String(n.id) === String(noteId));
        console.log("note in pin logic - ",note)
        if(!note) return;

        if(!note.isPinned) {

            note.isPinned = true;
            note.pinOrder = 0;
        

            state.notes.forEach( n => {
                if(n.isPinned && String(n.id) !== String(note.id)) {
                    n.pinOrder++;
                }
            });

        } else {

            note.isPinned = false;
            note.pinOrder = null;

            note.order = 0;
            state.notes.forEach( n => {
                if(!n.isPinned && String(n.id) !== String(note.id)) {
                    n.order++;
                }
            })
        }

        saveNotes();
        updateNoteOnServer(note);
        renderNotes();
        return;
    }

    if (e.target.closest(".delete_note")) {

        const note = state.notes.find(n => String(n.id) === String(noteId));

        console.log("they clciked dlete");
        e.stopPropagation();
        TemporaryDeleteNote(noteId);
        saveNotes();
        updateNoteOnServer(note);
        renderNotes();
        return;
    }

    if (e.target.closest(".restore_note")) {

        const note = state.notes.find(n => String(n.id) === String(noteId));

        e.stopPropagation();
        restoreNote(noteId);
        saveNotes();
        updateNoteOnServer(note);
        renderNotes();
        return;
    }

    if (e.target.closest(".permanent_delete_note")) {
        e.stopPropagation();
        requestPermanentDelete(noteId);
        return;
    }

    if (e.target.closest(".drag_handle")) return;

    if(!isTrash.isTrash){
        openEditor(noteId) 
    }

}