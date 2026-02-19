import { openEditor } from "./editNote.js";
import { saveNotes } from "./saveNotes.js";
import { state } from "./notesData.js";
import { createNoteOnServer } from "./serverSync.js";

export function createNote(type) {
  const timestamp = Date.now().toString();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const note = {
    id: timestamp,
    userId: Number(user.id),
    type: type,
    order: getNoteOrder(),        
    pinOrder: null,
    title: "",
    description: "",
    content: "",
    isPinned: false,
    isDeleted: false,
    isEditing: true,
    createdAt: timestamp,
    modifiedAt: timestamp
  };

  state.notes.push(note);
  saveNotes();
  createNoteOnServer(note);
  openEditor(note.id);
}

export function getNoteOrder(){
    const current_notes = state.notes.filter((n) => !n.isPinned && !n.isDeleted);
    if(current_notes.length === 0){
        return 0;
    }
    let max_order =0;
    for(let eachNote of current_notes){
        if(eachNote.order>max_order){
            max_order = eachNote.order;
        }
    }
    return max_order+1;
}
