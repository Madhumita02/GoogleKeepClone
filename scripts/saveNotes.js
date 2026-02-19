import { state } from "./notesData.js";

export function saveNotes(){
   const user = JSON.parse(localStorage.getItem("loggedInUser"));
   localStorage.setItem(`notes_${user.id}`, JSON.stringify(state.notes));
}
