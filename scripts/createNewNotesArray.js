import { state } from "./notesData.js";
import { new_checkbox, new_note } from "./renderNotesUi.js";

export function createNote(type) {
  const timestamp = Date.now();

  const note = {
    id: timestamp,
    type: type,
    order: getNoteOrder(),        
    pinOrder: null,
    title: "",
    description: "",
    content: "",
    isPinned: false,
    isDeleted: false,
    createdAt: timestamp,
    modifiedAt: timestamp
  };

  state.notes.push(note);

  if (type === "text") {
    new_note(note);
  } else if (type === "checklist") {
    new_checkbox(note);
  }
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
